import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db";
import { UserBoard } from "../models/UserBoard";
import { TaskColumn } from "../models/TaskColumn";

// Middleware if user corresponds to task board
export const taskColumnMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { column_id } = req.params;
  const parsedColumnId = parseInt(column_id, 10);
  const parsedUserId = parseInt(req.user.user_id, 10);

  try {
    const column = await AppDataSource.manager.findOne(TaskColumn, {
      where: {
        column_id: parsedColumnId,
      },
      relations: ["task_board"],
    });

    if (!column) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    const userBoard = await AppDataSource.manager.findOne(UserBoard, {
      where: {
        user: { user_id: parsedUserId },
        task_board: { board_id: column.task_board.board_id },
      },
    });

    if (!userBoard) {
      return res.status(403).json({
        message: "You do not have access to this board.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
