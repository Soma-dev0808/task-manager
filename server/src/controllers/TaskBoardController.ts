import { Response, Request } from "express";
import { AppDataSource } from "../db";
import { User } from "../models/User";
import { TaskBoard } from "../models/TaskBoard";
import { UserBoard } from "../models/UserBoard";

export const addUserToBoard = async (req: Request, res: Response) => {
  const { user_id, board_id } = req.body;

  try {
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        user_id,
      },
    });
    const taskBoard = await AppDataSource.manager.findOne(TaskBoard, {
      where: {
        board_id,
      },
    });

    if (!user || !taskBoard) {
      return res.status(400).json({ message: "User or TaskBoard not found!" });
    }

    const newUserBoard = new UserBoard();
    newUserBoard.user = user;
    newUserBoard.task_board = taskBoard;

    await AppDataSource.manager.save(newUserBoard);

    res.status(201).json({ message: "User added to board successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createBoard = async (req: Request, res: Response) => {
  const { board_name } = req.body;
  const user_id = req.user.user_id;

  try {
    const user = await AppDataSource.manager.findOne(User, {
      where: { user_id: parseInt(user_id, 10) },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    if (!board_name) {
      return res.status(400).json({
        message: "Board name is required!",
      });
    }

    // Generate a new board
    const taskBoard = new TaskBoard();
    taskBoard.board_name = board_name;

    // Generate a new user board
    const userBoard = new UserBoard();
    userBoard.user = user;
    userBoard.task_board = taskBoard;

    await AppDataSource.manager.save([taskBoard, userBoard]);

    return res.status(201).json({
      message: "TaskBoard created successfully!",
      taskBoard,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const getBoards = async (req: Request, res: Response) => {
  const user_id = req.user.user_id;

  try {
    const userBoards = await AppDataSource.manager.find(UserBoard, {
      where: { user: { user_id: parseInt(user_id, 10) } },
      relations: ["task_board"],
    });

    const taskBoards = userBoards.map((userBoard) => userBoard.task_board);

    return res.status(200).json({
      taskBoards,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
