import express from "express";
import { createBoard, getBoards } from "../controllers/TaskBoardController";
import { authenticationMiddleware } from "../middleware/authentication";

const router = express.Router();

router.post("/create", authenticationMiddleware, createBoard);
router.get("/", authenticationMiddleware, getBoards);

export default router;
