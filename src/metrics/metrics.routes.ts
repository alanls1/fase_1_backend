import { Router } from "express";
import {
  deleteMetrics,
  getMetrics,
  getMetricsByCode,
  postMetrics,
  putMetrics,
} from "./metrics.controller";
import { authentication } from "../middleware/authentication.middleware";

const router = Router();

router.get("/", getMetrics);

router.get("/", getMetricsByCode);

router.post("/", authentication, postMetrics);

router.put("/", authentication, putMetrics);

router.delete("/", authentication, deleteMetrics);

export default router;
