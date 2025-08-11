import { Request, Response } from "express";
import * as service from "./metrics.service";
import { plainToInstance } from "class-transformer";
import {
  createNewMetricsDTO,
  deleteMetricsDTO,
  editMetricsDTO,
  findMetricByCodeDTO,
  findMetricDTO,
  loadMetricByDTO,
  loadMetricDTO,
} from "./metrics.dto";
import { validate } from "class-validator";
import { CustomRequest } from "../types/user.interface";

export async function getMetrics(req: Request, res: Response) {
  const dto = plainToInstance(findMetricDTO, req.query);

  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  const metrics: loadMetricDTO[] | null = await service.findAll(dto);
  res.status(200).json(metrics);
}

export async function getMetricsByCode(req: Request, res: Response) {
  const dto = plainToInstance(findMetricByCodeDTO, req.query);

  const errors = await validate(dto);

  //Se tiver erros retorna
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  const metrics: loadMetricByDTO | null = await service.findByCode(dto);
  res.status(200).json(metrics);
}

export async function postMetrics(req: CustomRequest, res: Response) {
  const dto = plainToInstance(createNewMetricsDTO, req.body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }
  await service.newMetrics(dto);
  res.status(201).json({ message: "Novas medidas registradas com sucesso" });
}

export async function putMetrics(req: Request, res: Response) {
  const dto = plainToInstance(editMetricsDTO, req.body);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await service.updateMetrics(dto);
  res.status(200).json({ message: "Valores atualizado" });
}

export async function deleteMetrics(req: Request, res: Response) {
  const dto = plainToInstance(deleteMetricsDTO, req.query);

  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await service.deleteMetricsS(dto);
  res.status(200).json({ message: "Métrica deletada" });
}
