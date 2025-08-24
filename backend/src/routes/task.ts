import type { FastifyInstance } from "fastify";
import { getTaskController } from "../controllers/task.controller";

export default async function taskRoutes(app: FastifyInstance) {
  app.get("/get-data", getTaskController);
}
