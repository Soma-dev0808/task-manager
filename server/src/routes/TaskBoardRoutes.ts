import express from "express";
import { createBoard, getBoards } from "../controllers/TaskBoardController";
import { authMiddleware } from "../middleware/authentication";

const router = express.Router();

router.post("/create", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);

export default router;
