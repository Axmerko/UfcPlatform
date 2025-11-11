import statusController from "./controllers/status.controller.js";
import fighterController from "./controllers/fighter.controller.js";
import express from "express";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../utils/swagger.js";

import { validateFighterDto } from "./middleware/validation.middleware.js";
import cors from "cors";

export const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.get("/status", statusController.getStatus);
server.post("/fighters", validateFighterDto, fighterController.create);
server.get("/fighters", fighterController.findAll);
server.get("/fighters/:id", fighterController.findById);
server.put("/fighters/:id", validateFighterDto, fighterController.update);
server.delete("/fighters/:id", fighterController.delete);