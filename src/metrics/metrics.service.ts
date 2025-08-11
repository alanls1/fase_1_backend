import tbl_usuarios from "../users/user.model";
import {
  createNewMetricsDTO,
  deleteMetricsDTO,
  editMetricsDTO,
  findMetricByCodeDTO,
  findMetricDTO,
  loadMetricByDTO,
  loadMetricDTO,
} from "./metrics.dto";
import { tbl_medidas } from "./metrics.model";
import { v4 as uuidv4 } from "uuid";

export async function findAll({
  uid_usuarios,
}: findMetricDTO): Promise<loadMetricDTO[] | null> {
  const metrics = await tbl_medidas.findAll({ where: { uid_usuarios } });

  if (!metrics) {
    throw new Error("Nenhuma métrica encontrada");
  }

  return metrics;
}

export async function findByCode({
  codigo_publico,
}: findMetricByCodeDTO): Promise<loadMetricByDTO | null> {
  const user = await tbl_usuarios.findOne({ where: { codigo_publico } });

  if (!user) {
    throw new Error(
      "Usuário não encontrado, certifique-se se digitou o código corretamente"
    );
  }

  const metrics = await tbl_medidas.findOne({
    where: { uid_usuarios: user.uid_usuarios },
    attributes: ["busto", "torax", "cintura", "quadril", "coxa", "calcado"],
  });

  if (!metrics) {
    throw new Error("Medidas nao encontradas");
  }

  return metrics;
}

export async function newMetrics({
  busto,
  calcado,
  cintura,
  coxa,
  quadril,
  torax,
  uid_usuarios,
}: createNewMetricsDTO): Promise<number> {
  await tbl_medidas.create(
    {
      busto,
      calcado,
      cintura,
      coxa,
      quadril,
      torax,
      uid_medidas: uuidv4(),
      uid_usuarios,
      data: new Date(),
    },
    { logging: console.log }
  );

  return 201;
}

export async function updateMetrics({
  busto,
  calcado,
  cintura,
  coxa,
  quadril,
  torax,
  uid_medidas,
}: editMetricsDTO) {
  await tbl_medidas.update(
    {
      busto,
      calcado,
      cintura,
      coxa,
      quadril,
      torax,
    },
    { where: { uid_medidas } }
  );

  return 200;
}

export async function deleteMetricsS({ uid_medidas }: deleteMetricsDTO) {
  await tbl_medidas.destroy({ where: { uid_medidas } });

  return 200;
}
