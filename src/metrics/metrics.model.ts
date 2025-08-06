import { DataTypes, Model } from "sequelize";
import { IMetricts } from "../types/metrics.interface";
import sequelize from "../database/dataBase";

export class Metricts extends Model<IMetricts> implements IMetricts {
  public uid_medidas!: string;
  public uid_usuarios!: string;
  public busto!: number;
  public torax!: number;
  public cintura!: number;
  public quadril!: number;
  public coxa!: number;
  public calcado!: number;
}

Metricts.init(
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
    modelName: "User",
  }
);

export default Metricts;
