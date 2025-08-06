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
  name!: string;
  email!: string;
  phone!: string;
}

export class loginDTO {
  @IsEmail()
  email!: string;
  @MinLength(1)
  password!: string;
}
