import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

export class loadUserDTO {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    uid_usuario?: string | undefined;
    email?: string | undefined;
    name?: string | undefined;
  };
}

export class loginDTO {
  @IsEmail()
  email!: string;
  @MinLength(1)
  password!: string;
}

export class deleteDTO {
  @IsNotEmpty()
  @IsString()
  uid_usuarios!: string;
}
