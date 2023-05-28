import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";

const unauthorizedResponse = {
  status: 401,
  message: "Unauthorized!",
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (typeof token !== "string") {
    return res.status(unauthorizedResponse.status).json({
      message: unauthorizedResponse.message,
    });
  }

  const user = verifyToken(token);

  if (!user || typeof user === "string") {
    return res.status(unauthorizedResponse.status).json({
      message: unauthorizedResponse.status,
    });
  }

  req.user = user;
  next();
};
