import express from "express";
import {
  createBoard,
  getBoards,
  addUserToBoard,
} from "../controllers/TaskBoardController";
import { authMiddleware } from "../middleware/authentication";

const router = express.Router();

/**
 * @swagger
 * /api/task-board/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new task board
 *     tags: [Task Boards]
 *     description: This route allows a authenticated user to create a new task board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               board_name:
 *                 type: string
 *                 description: The name for the new task board
 *             required:
 *               - board_name
 *     responses:
 *       201:
 *         description: Successfully created new task board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: TaskBoard created successfully!
 *                 taskBoard:
 *                   type: object
 *                   properties:
 *                     board_id:
 *                       type: integer
 *                     board_name:
 *                       type: string
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
router.post("/create", authMiddleware, createBoard);

/**
 * @swagger
 * /api/task-board/add-user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add user to a task board
 *     tags: [Task Boards]
 *     description: This route allows a authenticated user to add user to a task board.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User id
 *               board_id:
 *                 type: string
 *                 description: Board id
 *             required:
 *               - user_id
 *               - board_id
 *     responses:
 *       201:
 *         description: User added to board successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User added to board successfully!
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.post("/add-user", authMiddleware, addUserToBoard);

/**
 * @swagger
 * /api/task-board:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all task boards for the authenticated user
 *     tags: [Task Boards]
 *     description: This route allows a authenticated user to get all his task boards.
 *     responses:
 *       200:
 *         description: Successfully fetched task boards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskBoards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       board_id:
 *                         type: integer
 *                       board_name:
 *                         type: string
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

router.get("/", authMiddleware, getBoards);

export default router;
