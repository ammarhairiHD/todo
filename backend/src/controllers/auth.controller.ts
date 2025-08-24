import type { FastifyReply, FastifyRequest } from "fastify";
import type { SigninBody, SignupBody } from "../types/user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export async function signInController(
  req: FastifyRequest<{ Body: SigninBody }>,
  rep: FastifyReply
) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return rep.status(400).send({ message: "Invalid Email" });
    }

    const passwordCheck = await argon2.verify(user.password, password);
    if (!passwordCheck) {
      return rep.status(400).send({ message: "Wrong Password" });
    }

    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "4h" });

    rep.send({ token });
  } catch (err) {
    rep
      .status(500)
      .send({ message: "Error logging in, please try again later" });
  }
}

export async function signUpController(
  req: FastifyRequest<{ Body: SignupBody }>,
  rep: FastifyReply
) {
  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const user = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    rep
      .status(200)
      .send({ message: "Succesfully create account, you can now log in" });
  } catch (err) {
    rep
      .status(500)
      .send({ message: "Failed to create account, please try again later" });
  }
}

export async function profileController(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return rep.status(401).send({ message: "Incorrect token" });
    }

    const decoded = jwt.verify(token as string, "secret_key") as { id: string };
    const user = await userModel
      .findById(decoded.id)
      .select("name username email");

    if (!user) {
      return rep.status(404).send({ message: "User not found" });
    }

    rep.send({
      id: user?.id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
    });
  } catch (err) {
    rep.status(500).send({ message: "Internal Server Error" });
  }
}
