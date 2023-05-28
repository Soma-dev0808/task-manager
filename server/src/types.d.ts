import { JwtPayload } from "jsonwebtoken";
import { Task } from "./models/Task";
import { TaskColumn } from "./models/TaskColumn";

export interface UserJwtPayload extends JwtPayload {
  user_name: string;
  user_id: string;
}

declare module "express-serve-static-core" {
  export interface Request {
    user: UserJwtPayload;
    task?: Task;
    column?: TaskColumn;
  }
}
