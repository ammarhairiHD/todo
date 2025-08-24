import fastify from "fastify";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = fastify({ logger: true });
const portListener = Number(process.env.PORT || 3000);
const DB = String(process.env.DB_URL);

mongoose
  .connect(DB)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Failed to connect"));

app.register(authRoutes, { prefix: "/auth" });
app.register(taskRoutes, { prefix: "/tasks" });

const start = async () => {
  try {
    await app.listen({ port: portListener });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
