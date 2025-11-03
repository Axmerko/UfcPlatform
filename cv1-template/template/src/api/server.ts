import statusController from "./controllers/status.controller";
import catController from "./controllers/cat.controller";

const express = require("express");
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../utils/swagger";

export const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.get("/status", statusController.getStatus);
server.post("/cats", catController.create);
server.get("/cats", catController.findAll);
server.get("/cats/:id", catController.findById);
server.put("/cats/:id", catController.update);
server.delete("/cats/:id", catController.delete);
