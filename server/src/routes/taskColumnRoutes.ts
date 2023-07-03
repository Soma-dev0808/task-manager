import express from "express";
import {
  createTaskColumn,
  deleteColumn,
  getTaskColumns,
  updateColumnOrder,
  updateTaskColumnTitle,
} from "../controllers/TaskColumnController";
import { authMiddleware } from "../middleware/authentication";
import { taskBoardMiddleware } from "../middleware/taskboard";
import { taskColumnMiddleware } from "../middleware/taskColumn";

const router = express.Router();

/**
 * @swagger
 * /api/columns/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new task column
 *     tags: [Task Columns]
 *     description: This route allows a authenticated user to create a new task column for a specific task board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title for the new task column
 *               board_id:
 *                 type: integer
 *                 description: The id of the board for which the task column will be created
 *             required:
 *               - title
 *               - board_id
 *     responses:
 *       200:
 *         description: Successfully created new task column
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column created successfully!
 *                 column:
 *                   type: object
 *                   properties:
 *                     column_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     order:
 *                       type: integer
 *                     task_board:
 *                       type: object
 *                       properties:
 *                         board_id:
 *                           type: integer
 *                         board_name:
 *                           type: string
 *       400:
 *         description: Board not found or Invalid board_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board not found!
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.post("/create", authMiddleware, createTaskColumn);

/**
 * @swagger
 * /api/columns/{board_id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all task columns for a specific task board
 *     tags: [Task Columns]
 *     description: This route allows a authenticated user to get all his task columns for a specific task board.
 *     parameters:
 *       - in: path
 *         name: board_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the task board
 *     responses:
 *       200:
 *         description: Successfully fetched task columns
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: TaskColumns fetched successfully!
 *                 taskColumns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       column_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       order:
 *                         type: integer
 *                 taskBoard:
 *                   type: object
 *                   properties:
 *                     board_id:
 *                       type: integer
 *                     board_name:
 *                       type: string
 *       400:
 *         description: Invalid board_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid board_id.
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.get("/:board_id", [authMiddleware, taskBoardMiddleware], getTaskColumns);

/**
 * @swagger
 * /api/columns/update/{column_id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update task column title
 *     tags: [Task Columns]
 *     description: This route allows a authenticated user to update the title of a task column.
 *     parameters:
 *       - in: path
 *         name: column_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the task column to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title for the task column
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Successfully updated task column
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column updated successfully!
 *                 columnToUpdate:
 *                   type: object
 *                   properties:
 *                     column_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *       400:
 *         description: Invalid column_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid column_id.
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.put(
  "/update/:column_id",
  [authMiddleware, taskColumnMiddleware],
  updateTaskColumnTitle
);

/**
 * @swagger
 * /api/columns/delete/{column_id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a task column
 *     tags: [Task Columns]
 *     description: This route allows a authenticated user to delete a task column.
 *     parameters:
 *       - in: path
 *         name: column_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the task column to delete
 *     responses:
 *       200:
 *         description: Successfully deleted task column
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column deleted successfully!
 *       400:
 *         description: Invalid column_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid column_id.
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.delete(
  "/delete/:column_id",
  [authMiddleware, taskColumnMiddleware],
  deleteColumn
);

router.put(
  "/update-order/:column_id",
  [authMiddleware, taskColumnMiddleware],
  updateColumnOrder
);

export default router;
