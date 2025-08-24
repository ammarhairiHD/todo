import type { FastifyRequest, FastifyReply } from "fastify";
import type { task } from "../types/task";
import jwt from "jsonwebtoken";
import taskModel from "../models/task.model";
import userModel from "../models/user.model";

export async function getTaskController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const checkAuth = req.headers.authorization;
    const token = checkAuth?.split(" ")[1];

    if (!token) {
      return rep.send({
        message: "Token is not valid, please sign out and the sign in again",
      });
    }

    const decoded = jwt.verify(token as string, "secret_key") as { id: string };

    const taskData = await taskModel
      .findById(decoded.id)
      .select("title description task_status createdAt");

    if (!taskData) {
      return rep.send({
        message: "No tasks available, please create one by click the + icon",
      });
    }

    const resposeTasks = {
      title: taskData.title,
      description: taskData.description,
      task_staus: taskData.task_status,
      createdAt: taskData.createdAt,
    };

    rep.send([resposeTasks]);
  } catch (err) {
    rep.send("Server Error");
  }
}
