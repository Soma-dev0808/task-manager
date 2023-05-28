import express from "express";
import {
  createTaskColumn,
  deleteColumn,
  getTaskColumns,
  updateTaskColumnTitle,
} from "../controllers/TaskColumnController";
import { authMiddleware } from "../middleware/authentication";
import { taskBoardMiddleware } from "../middleware/taskboard";
import { taskColumnMiddleware } from "../middleware/taskColumn";

const router = express.Router();

router.post("/create", authMiddleware, createTaskColumn);
router.get("/:board_id", [authMiddleware, taskBoardMiddleware], getTaskColumns);
router.put(
  "/update/:column_id",
  [authMiddleware, taskColumnMiddleware],
  updateTaskColumnTitle
);
router.delete(
  "/delete/:column_id",
  [authMiddleware, taskColumnMiddleware],
  deleteColumn
);

export default router;
