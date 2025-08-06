import {
  createNewMetricsDTO,
  deleteMetricsDTO,
  editMetricsDTO,
  findMetricDTO,
  loadMetricDTO,
} from "./metrics.dto";
import { Metricts } from "./metrics.model";
import { v4 as uuidv4 } from "uuid";

export async function findOne({
  uid_usuarios,
}: findMetricDTO): Promise<loadMetricDTO | null> {
  const metricts = await Metricts.findOne({ where: { uid_usuarios } });

  if (!metricts) {
    throw new Error("Nenhuma métrica encontrada");
  }

  return metricts;
}

export async function newMetrics({
  busto,
  calcado,
  cintura,
  coxa,
  quadril,
  torax,
  uid_usuarios,
}: createNewMetricsDTO) {
  const metricts = await Metricts.create({
    busto,
    calcado,
    cintura,
    coxa,
    quadril,
    torax,
    uid_medidas: uuidv4(),
    uid_usuarios,
  });

  if (!metricts) {
    throw new Error("Nenhuma métrica encontrada");
  }

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
  uid_usuarios,
}: editMetricsDTO) {
  await Metricts.update(
    {
      busto,
      calcado,
      cintura,
      coxa,
      quadril,
      torax,
      uid_medidas: uuidv4(),
      uid_usuarios,
    },
    { where: { uid_medidas } }
  );

  return 200;
}

export async function deleteMetricsS({ uid_medidas }: deleteMetricsDTO) {
  await Metricts.destroy({ where: { uid_medidas } });

  return 200;
}
