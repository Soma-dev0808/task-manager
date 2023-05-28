import { Request, Response } from "express";
import { TaskColumn } from "../models/TaskColumn";
import { AppDataSource } from "../db";
import { TaskBoard } from "../models/TaskBoard";

export const createTaskColumn = async (req: Request, res: Response) => {
  const { title, board_id } = req.body;

  try {
    const taskBoard = await AppDataSource.manager.findOne(TaskBoard, {
      where: { board_id: parseInt(board_id, 10) },
    });

    if (!taskBoard) {
      return res.status(400).json({
        message: "Board not found!",
      });
    }

    const column = new TaskColumn();
    column.title = title;
    column.task_board = taskBoard;

    await AppDataSource.manager.save(column);

    return res.status(200).json({
      message: "Column created successfully!",
      column,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const getTaskColumns = async (req: Request, res: Response) => {
  const { board_id } = req.params;
  const parsedBoardId = parseInt(board_id, 10);

  if (isNaN(parsedBoardId)) {
    return res.status(400).json({
      message: "Invalid board_id.",
    });
  }

  try {
    const taskColumns = await AppDataSource.manager.find(TaskColumn, {
      where: { task_board: { board_id: parsedBoardId } },
      relations: ["task_board", "task_groups"],
    });

    return res.status(200).json({
      message: "TaskColumns fetched successfully!",
      taskColumns,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const updateTaskColumnTitle = async (req: Request, res: Response) => {
  const columnToUpdate = req.column;
  const { title } = req.body;

  if (typeof columnToUpdate === "undefined") {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    columnToUpdate.title = title;
    await AppDataSource.manager.save(columnToUpdate);

    return res.status(200).json({
      message: "Column updated successfully!",
      columnToUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  const columnToDelete = req.column;

  if (typeof columnToDelete === "undefined") {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    await AppDataSource.manager.remove(columnToDelete);

    return res.status(200).json({
      message: "Column deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
