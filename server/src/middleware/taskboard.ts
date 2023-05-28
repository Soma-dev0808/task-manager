import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db";
import { UserBoard } from "../models/UserBoard";

// Middleware if user corresponds to task board
export const taskBoardMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { board_id } = req.params;
  const parsedBoardId = parseInt(board_id, 10);
  const parsedUserId = parseInt(req.user.user_id, 10);

  if (isNaN(parsedBoardId) || isNaN(parsedUserId)) {
    return res.status(400).json({
      message: "Invalid board_id.",
    });
  }

  try {
    const userBoard = await AppDataSource.manager.findOne(UserBoard, {
      where: {
        user: { user_id: parsedUserId },
        task_board: { board_id: parsedBoardId },
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
