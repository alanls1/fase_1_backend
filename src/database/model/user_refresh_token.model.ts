import { DataTypes, Model, Sequelize } from "sequelize";
import tbl_usuarios from "../../users/user.model";
import sequelize from "../dataBase";

interface IUser_refresh_tokens {
  uid_user_refresh_token?: string;
  uid_usuarios?: string;
  refresh_token?: string;
  user_agent?: string;
  ip_address?: string;
  expires_at?: Date;
}

export class user_refresh_tokens
  extends Model<IUser_refresh_tokens>
  implements IUser_refresh_tokens
{
  public uid_user_refresh_token?: string;
  public uid_usuarios?: string;
  public refresh_token?: string;
  public user_agent?: string;
  public ip_address?: string;
  public expires_at?: Date;
}

user_refresh_tokens.init(
  {
    uid_user_refresh_token: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    uid_usuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: tbl_usuarios,
        key: "uid_usuarios",
      },
      onDelete: "CASCADE",
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    user_agent: DataTypes.STRING(255),

    ip_address: DataTypes.STRING(45),

    expires_at: DataTypes.DATE(),
  },
  {
    sequelize,
    timestamps: false,
    modelName: "tbl_user_refresh_tokens",
  }
);
