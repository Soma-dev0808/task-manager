import { Request, Response } from "express";
import { TaskColumn } from "../models/TaskColumn";
import { AppDataSource } from "../db";
import { Task } from "../models/Task";
import { UserBoard } from "../models/UserBoard";

export const createTask = async (req: Request, res: Response) => {
  const { column_id, title } = req.body;
  const parsedColumnId = parseInt(column_id, 10);
  const parsedUserId = parseInt(req.user.user_id, 10);

  try {
    //  TODO:This part could be in a middleware
    const taskColumn = await AppDataSource.manager.findOne(TaskColumn, {
      where: { column_id: parsedColumnId },
      relations: ["task_board"],
    });

    if (!taskColumn) {
      return res.status(404).json({
        message: "Column not found.",
      });
    }

    // Check if user has access to the board
    const userBoard = await AppDataSource.manager.findOne(UserBoard, {
      where: {
        user: { user_id: parsedUserId },
        task_board: { board_id: taskColumn.task_board.board_id },
      },
    });

    if (!userBoard) {
      return res.status(403).json({
        message: "You do not have access to this board.",
      });
    }

    // Find the last task in the column
    const lastTaskInColumn = await AppDataSource.manager.findOne(Task, {
      where: { task_column: { column_id: parsedColumnId } },
      order: { order: "DESC" },
    });

    const newOrder = lastTaskInColumn ? lastTaskInColumn.order + 1 : 1;

    const newTask = new Task();
    newTask.title = title;
    newTask.order = newOrder;
    newTask.task_column = taskColumn;
    newTask.task_board = taskColumn.task_board;

    const savedTask = await AppDataSource.manager.save(newTask);

    return res.status(200).json({
      message: "Task created successfully!",
      task: savedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { title, content, estimate } = req.body;
  const taskToUpdate = req.task;

  if (typeof taskToUpdate === "undefined") {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    taskToUpdate.title = title;
    taskToUpdate.content = content;
    taskToUpdate.estimate = estimate;

    const updatedTask = await AppDataSource.manager.save(taskToUpdate);

    return res.status(200).json({
      message: "Task updated successfully!",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskToDelete = req.task;

  if (typeof taskToDelete === "undefined") {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    await AppDataSource.manager.remove(taskToDelete);

    return res.status(200).json({
      message: "Task deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
