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

export async function postMetrics(req: Request, res: Response) {
  console.log("Passei", req.body);

  const dto = plainToInstance(createNewMetricsDTO, req.body);

  console.log("erros: ", dto);
  console.log("erros: ", await validate(dto));
  const errors = await validate(dto);
  console.log("erros: ", errors);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Dados inválidos",
      erros: errors.map((err) => err.constraints),
    });
  }

  await service.newMetrics(dto);
  res.status(201);
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
  res.status(200);
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
  res.status(200);
}
