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

    // Find the last task in a column
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

export const updateTaskOrder = async (req: Request, res: Response) => {
  const { column_id, new_order } = req.body;
  // TODO: Remove middleware and use req.taskId to avoid unnecessary db call
  const taskToUpdate = req.task;

  const parsedColumnId = parseInt(column_id, 10);
  const parsedNewOrder = parseInt(new_order, 10);

  if (
    typeof taskToUpdate === "undefined" ||
    isNaN(parsedNewOrder) ||
    isNaN(parsedColumnId)
  ) {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    const column = await AppDataSource.manager.findOne(TaskColumn, {
      where: { column_id: parsedColumnId },
      relations: ["tasks"],
    });

    if (column === null) {
      return res.status(404).json({
        message: "Column not found.",
      });
    }

    const { tasks } = column;

    const target = tasks.find((task) => task.task_id === taskToUpdate.task_id);

    if (typeof target === "undefined") {
      return res.status(500).json({
        message: "Something went wrong with the task.",
      });
    }

    const otherTasks = tasks.filter((task) => task.task_id !== target.task_id);

    otherTasks.sort((a, b) => {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    });

    otherTasks.splice(parsedNewOrder - 1, 0, target);

    let currOrder = 1;
    otherTasks.forEach((task) => {
      task.order = currOrder++;
    });

    const updatedTasks = await AppDataSource.manager.save(tasks);

    res.status(200).json({
      message: "Task order updated successfully!",
      updatedOrderTasks: updatedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const updateTaskOrderOverColumn = async (
  req: Request,
  res: Response
) => {
  const { new_column_id, new_order } = req.body;
  const taskToUpdate = req.task;

  const parsedNewOrder = parseInt(new_order, 10);
  const parsedNewColumnId = parseInt(new_column_id, 10);

  if (
    typeof taskToUpdate === "undefined" ||
    isNaN(parsedNewOrder) ||
    isNaN(parsedNewColumnId)
  ) {
    return res.status(500).json({
      message: "Something went wrong with the task.",
    });
  }

  try {
    const newColumn = await AppDataSource.manager.findOne(TaskColumn, {
      where: { column_id: parsedNewColumnId },
      relations: ["tasks"],
    });

    if (newColumn === null) {
      return res.status(404).json({
        message: "Column not found.",
      });
    }

    // Update the task info
    taskToUpdate.task_column = newColumn;
    taskToUpdate.order = parsedNewOrder;
    await AppDataSource.manager.save(taskToUpdate);

    const tasksInNewCol = newColumn.tasks.filter(
      (task) => task.task_id !== taskToUpdate.task_id
    );

    tasksInNewCol.sort((a, b) => {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    });

    tasksInNewCol.splice(parsedNewOrder - 1, 0, taskToUpdate);

    // Update each task's order
    let currOrder = 1;
    tasksInNewCol.forEach((task) => {
      task.order = currOrder++;
    });

    const updatedColumn = await AppDataSource.manager.save(tasksInNewCol);

    res.status(200).json({
      message: "Task order updated successfully!",
      updatedColumn: updatedColumn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
