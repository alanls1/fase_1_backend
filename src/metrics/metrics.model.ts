import { DataTypes, Model } from "sequelize";
import { IMetricts } from "../types/metrics.interface";
import sequelize from "../database/dataBase";
import tbl_usuarios from "../users/user.model";

export class tbl_medidas extends Model<IMetricts> implements IMetricts {
  public uid_medidas!: string;
  public uid_usuarios!: string;
  public busto!: number;
  public torax!: number;
  public cintura!: number;
  public quadril!: number;
  public coxa!: number;
  public calcado!: number;
}

tbl_medidas.init(
  {
    uid_medidas: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      allowNull: false,
    },
    uid_usuarios: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(36),
      references: {
        model: tbl_usuarios,
        key: "uid_usuarios",
      },
    },
    busto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    torax: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    cintura: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    quadril: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    coxa: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    calcado: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "tbl_medidas",
    timestamps: false,
  }
);

export default tbl_medidas;
