import express from "express";
import { authMiddleware } from "../middleware/authentication";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskOrder,
  updateTaskOrderOverColumn,
} from "../controllers/TaskController";
import { taskMiddleware } from "../middleware/taskMiddleware";

const router = express.Router();

// FIX add schema later
/**
 * @swagger
 * /api/task/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     description: This endpoint allows an authenticated user to create a new task.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               column_id:
 *                 type: integer
 *                 description: The column id where the new task will be created
 *               title:
 *                 type: string
 *                 description: The title of the new task
 *             required:
 *               - column_id
 *               - title
 *     responses:
 *       200:
 *         description: Successfully created new task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully!
 *                 task:
 *                   type: object
 *                   properties:
 *                     task_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                       example: My new task
 *                     content:
 *                       type: string
 *                       example: My new task content
 *                     estimate:
 *                       type: integer
 *                       example: 5
 *                     order:
 *                       type: integer
 *                       example: 1
 *                     task_column:
 *                       type: object
 *                       properties:
 *                         column_id:
 *                           type: integer
 *                         title:
 *                           type: string
 *                           example: My new column
 *                         order:
 *                           type: integer
 *                           example: 1
 *
 *       403:
 *         description: You do not have access to this board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You do not have access to this board.
 *       404:
 *         description: Column not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column not found.
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
router.post("/create", [authMiddleware], createTask);

/**
 * @swagger
 * paths:
 *   /api/tasks/update/{task_id}:
 *     put:
 *       summary: Update an existing task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: task_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the task to update
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *       responses:
 *         '200':
 *           description: Task updated successfully
 *           content:
 *             application/json:
 *               schema:
 *       403:
 *         description: You do not have access to this board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You do not have access to this board.
 *       404:
 *         description: Column not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column not found.
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
router.put("/update/:task_id", [authMiddleware, taskMiddleware], updateTask);

/**
 * @swagger
 * paths:
 *   /api/tasks/delete/{task_id}:
 *     delete:
 *       summary: Delete an existing task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: task_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the task to delete
 *       responses:
 *         '200':
 *           description: Task deleted successfully
 *       400:
 *         description: User not found or Board name is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found!
 *       403:
 *         description: You do not have access to this board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You do not have access to this board.
 *       404:
 *         description: Column not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column not found.
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
router.delete("/delete/:task_id", [authMiddleware, taskMiddleware], deleteTask);

router.put(
  "/update-order/:task_id",
  [authMiddleware, taskMiddleware],
  updateTaskOrder
);

router.put(
  "/update-order-over-column/:task_id",
  [authMiddleware, taskMiddleware],
  updateTaskOrderOverColumn
);

export default router;
