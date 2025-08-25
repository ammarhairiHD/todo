import type { FastifyInstance } from "fastify";
import {
  getTaskController,
  createTaskController,
  updateTask,
} from "../controllers/task.controller";

export default async function taskRoutes(app: FastifyInstance) {
  app.get("/get-data", getTaskController);
  app.post("/create-data", createTaskController);
  app.put("/update-data/:id", updateTask);
}
