import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database/dataBase";
import { IUser } from "../types/user.interface";

export class tbl_usuarios extends Model<IUser> implements IUser {
  public uid_usuarios?: string;
  public nome?: string;
  public email?: string;
  public senha_hash?: string;
  public codigo_publico?: string;
}

tbl_usuarios.init(
  {
    uid_usuarios: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    senha_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    codigo_publico: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "tbl_usuarios",
  }
);

export default tbl_usuarios;
