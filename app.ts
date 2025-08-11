import "reflect-metadata";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connection } from "./src/database/dataBase";
import { errorMiddleware } from "./src/middleware/error.middleware";
import metrics from "./src/metrics/metrics.routes";
import user from "./src/users/user.routes";

require("dotenv").config();

const app = express();

connection();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(morgan("dev"));
app.use(express.json());

app.use("/metrics", metrics);
app.use("/users", user);

app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("API está rodando!");
});

const PORT = process.env.PORT || 3000!;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
