import express from "express";
import { authMiddleware } from "../middleware/authentication";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/TaskController";
import { taskMiddleware } from "../middleware/taskMiddleware";

const router = express.Router();

router.post("/create", [authMiddleware], createTask);
router.put("/update/:task_id", [authMiddleware, taskMiddleware], updateTask);
router.delete("/delete/:task_id", [authMiddleware, taskMiddleware], deleteTask);

export default router;
