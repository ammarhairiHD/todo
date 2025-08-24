import type { FastifyInstance } from "fastify";
import {
  profileController,
  signInController,
  signUpController,
} from "../controllers/auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/signin", signInController);
  app.post("/signup", signUpController);
  app.get("/profile", profileController);
}
