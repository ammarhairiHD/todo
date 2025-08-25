import type { FastifyRequest, FastifyReply } from "fastify";
import type { task } from "../types/task";
import jwt from "jsonwebtoken";
import taskModel from "../models/task.model";
import userModel from "../models/user.model";
import { Schema } from "mongoose";

export async function getTaskController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const checkAuth = req.headers.authorization;
    const token = checkAuth?.split(" ")[1];

    if (!token) {
      return rep.status(401).send({
        message: "Token is not valid, please sign out and the sign in again",
      });
    }

    const decoded = jwt.verify(token as string, "secret_key") as { id: string };

    const taskData = await taskModel
      .find({ user: decoded.id })
      .select("title description task_status createdAt");

    if (!taskData || taskData.length === 0) {
      return rep.status(404).send({
        message: "No tasks available, please create one by click the + icon",
      });
    }

    rep.send(taskData);
  } catch (err) {
    rep.send("Server Error");
  }
}

export async function createTaskController(
  req: FastifyRequest<{ Body: task }>,
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
    const { title, description, task_status } = req.body;

    const addTask = new taskModel({
      title,
      description,
      user: decoded.id,
      task_status,
    });

    await addTask.save();

    rep.status(200).send({ message: "task created" });
  } catch (err) {
    rep.status(500).send({ message: "Couldn't create new task" });
  }
}

export async function updateTask(req: FastifyRequest, rep: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return rep.status(401).send({ message: "Unauthorized token" });
    }

    const decoded = jwt.verify(token as string, "secret_key") as { id: string };
    const { id } = req.params as any;
    const { title, description, task_status } = req.body as task;
    const updateTask = await taskModel.findOneAndUpdate(
      { _id: id, user: decoded.id },
      { $set: { title, description, task_status } },
      { new: true }
    );

    if (!updateTask) {
      return rep.status(403).send({ message: "failed to update" });
    }

    rep.send({ message: "Tasks updated!", updateTask });
  } catch (err) {
    rep.status(500).send({ message: "Couldn't update tasks" });
  }
}
