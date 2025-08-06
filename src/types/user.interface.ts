import { Request } from "express";

export interface IUser {
  uid_usuarios?: string;
  email?: string;
  nome?: string;
  senha_hash?: string;
  codigo_publico?: string;
}

export interface CustomRequest extends Request {
  user?: {
    name?: string;
    uid_usuarios?: string;
  };
}
