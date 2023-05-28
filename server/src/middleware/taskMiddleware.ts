import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db";
import { Task } from "../models/Task";
import { UserBoard } from "../models/UserBoard";

export const taskMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { task_id } = req.params;
  const parsedTaskId = parseInt(task_id, 10);
  const parsedUserId = parseInt(req.user.user_id, 10);

  if (isNaN(parsedTaskId) || isNaN(parsedUserId)) {
    return res.status(400).json({
      message: "Invalid task_id.",
    });
  }

  try {
    const targetTask = await AppDataSource.manager.findOne(Task, {
      where: { task_id: parsedTaskId },
      relations: ["task_column", "task_board"],
    });

    if (!targetTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const userBoard = await AppDataSource.manager.findOne(UserBoard, {
      where: {
        user: { user_id: parsedUserId },
        task_board: { board_id: targetTask.task_board.board_id },
      },
    });

    if (!userBoard) {
      return res.status(403).json({
        message: "You do not have access to this board.",
      });
    }

    req.task = targetTask;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
