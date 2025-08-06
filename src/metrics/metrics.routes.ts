import { Router } from "express";
import {
  deleteMetrics,
  getMetrics,
  postMetrics,
  putMetrics,
} from "./metrics.controller";
import { isAdmin } from "../middleware/isAdmin.middleware";

const router = Router();

router.get("/", getMetrics);

router.post("/", isAdmin, postMetrics);

router.put("/", isAdmin, putMetrics);

router.delete("/", isAdmin, deleteMetrics);

export default router;
