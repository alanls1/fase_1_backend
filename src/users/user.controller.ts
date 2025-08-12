import { CookieOptions, NextFunction, Request, Response } from "express";
import * as service from "./user.service";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO, deleteDTO, loginDTO } from "./user.dto";
import { validate } from "class-validator";

export async function createUser(req: Request, res: Response) {
  const dto = plainToInstance(CreateUserDTO, req.body);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  //Se tudo estiver ok, passa o dto para o service
  const user = await service.create(dto);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const dto = plainToInstance(loginDTO, req.body);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }
  const ip_address =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user_agent = req.headers["user-agent"] || "";

  //Se tudo estiver ok, passa o dto para o service
  const token = await service.login(dto, {
    ip_address: ip_address as string,
    user_agent,
  });

  res.status(200).json({
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    user: token.user,
  });
}

export async function deleteAccount(req: Request, res: Response) {
  const dto = plainToInstance(deleteDTO, req.query);
  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await service.deleteAccount(dto);
  res.status(200);
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  //Se tudo estiver ok, passa o dto para o service
  const newToken = await service.refreshToken(token);

  res.json({ accessToken: newToken.accessToken });
}

export async function logout(req: Request, res: Response) {
  try {
    const token = req.body.refreshToken;
    if (token) {
      await service.revokeRefreshToken(token);
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: "Erro no logout" });
  }
}
