import { CreateUserDTO, loginDTO } from "./user.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { user_refresh_tokens } from "../database/model/user_refresh_token.model";
import tbl_usuarios from "./user.model";
import { nanoid } from "nanoid";

export async function create(data: CreateUserDTO) {
  const { name, email, password } = data;

  const userExists = await tbl_usuarios.findOne({ where: { email } });

  if (userExists) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await tbl_usuarios.create({
    nome: name,
    email,
    senha_hash: hashedPassword,
    codigo_publico: nanoid(12),
  });

  return {
    uid_usuario: newUser.uid_usuarios,
    name: newUser.nome,
    email: newUser.email,
    codigo_publico: newUser.codigo_publico,
  };
}

export async function login(
  { email, password }: loginDTO,
  meta?: { ip_address?: string; user_agent?: string }
) {
  const user = await tbl_usuarios.findOne({
    where: { email },
    attributes: ["id", "email", "password", "role"],
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isSamePassword = await bcrypt.compare(password, user.senha_hash!);

  if (!isSamePassword) {
    throw new Error("Email/Senha incorreto");
  }

  const { accessToken, refreshToken } = createTokens(
    user.email,
    user.uid_usuarios,
    user.codigo_publico
  );

  const hashRefreshToken = await bcrypt.hash(refreshToken, 16);
  const expires_at = new Date();
  expires_at.setDate(expires_at.getDate() + 7);

  await user_refresh_tokens.create({
    uid_usuarios: user.uid_usuarios,
    refresh_token: hashRefreshToken,
    uid_user_refresh_token: uuidv4(),
    expires_at,
    ip_address: meta?.ip_address,
    user_agent: meta?.user_agent,
  });

  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      uid_usuario: user.uid_usuarios,
      email: user.email,
      name: user.nome,
    },
  };
}

export async function refreshToken(token: string) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECURE!) as {
      id: number;
    };
  } catch (err) {
    throw new Error("Refresh token inválido ou expirado");
  }

  const allTokens = await user_refresh_tokens.findAll({
    where: { uid_usuarios: decoded.id },
  });

  let tokenFound;

  for (const t of allTokens) {
    const isMatch = await bcrypt.compare(token, t.refresh_token as string);
    if (isMatch) {
      tokenFound = t;
      break;
    }
  }

  if (!tokenFound) {
    throw new Error("Refresh token inválido");
  }

  if (tokenFound?.expires_at && tokenFound?.expires_at < new Date()) {
    throw new Error("Refresh token expirado");
  }

  const user = await tbl_usuarios.findOne({
    where: { uid_usuarios: tokenFound.uid_usuarios },
  });

  const { accessToken, refreshToken } = createTokens(
    user?.email,
    user?.uid_usuarios
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 16);
  const expires_at = new Date();
  expires_at.setDate(expires_at.getDate() + 7);

  await tokenFound.update({
    refresh_token: hashedRefreshToken,
    expires_at,
  });

  return { accessToken, refreshToken };
}

export function createTokens(email?: string, id?: string, role?: string) {
  const accessToken = jwt.sign({ email, id, role }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECURE!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}
