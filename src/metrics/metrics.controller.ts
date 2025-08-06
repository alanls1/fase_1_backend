import { Request, Response } from "express";
import {
  deleteMetricsS,
  findOne,
  newMetrics,
  updateMetrics,
} from "./metrics.service";
import { plainToInstance } from "class-transformer";
import {
  createNewMetricsDTO,
  deleteMetricsDTO,
  editMetricsDTO,
  findMetricDTO,
  loadMetricDTO,
} from "./metrics.dto";
import { validate } from "class-validator";

export async function getMetrics(req: Request, res: Response) {
  const dto = plainToInstance(findMetricDTO, req);

  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  const metrics: loadMetricDTO | null = await findOne(dto);
  res.status(200).json(metrics);
}

export async function postMetrics(req: Request, res: Response) {
  const dto = plainToInstance(createNewMetricsDTO, req);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await newMetrics(dto);
  res.status(201);
}

export async function putMetrics(req: Request, res: Response) {
  const dto = plainToInstance(editMetricsDTO, req);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await updateMetrics(dto);
  res.status(200);
}

export async function deleteMetrics(req: Request, res: Response) {
  const dto = plainToInstance(deleteMetricsDTO, req);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await deleteMetricsS(dto);
  res.status(200);
}
