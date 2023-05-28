import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload {
  user_name: string;
  user_id: string;
}

declare module "express-serve-static-core" {
  export interface Request {
    user: UserJwtPayload;
  }
}
