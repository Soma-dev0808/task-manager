import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserJwtPayload } from "../types";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "";

const generateToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as string | UserJwtPayload;
};

export { generateToken, verifyToken };
