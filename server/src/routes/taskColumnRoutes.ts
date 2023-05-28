import express from "express";
import {
  createTaskColumn,
  deleteColumn,
  getTaskColumns,
  updateTaskColumnTitle,
} from "../controllers/TaskColumnController";
import { authenticationMiddleware } from "../middleware/authentication";
import { taskBoardMiddleware } from "../middleware/taskboard";
import { taskColumnMiddleware } from "../middleware/taskColumn";

const router = express.Router();

router.post("/create", authenticationMiddleware, createTaskColumn);
router.get(
  "/:board_id",
  [authenticationMiddleware, taskBoardMiddleware],
  getTaskColumns
);
router.put(
  "/update/:column_id",
  [authenticationMiddleware, taskColumnMiddleware],
  updateTaskColumnTitle
);
router.delete(
  "/delete/:column_id",
  [authenticationMiddleware, taskColumnMiddleware],
  deleteColumn
);

export default router;
