import express from "express";
import { authMiddleware } from "../middleware/authentication";
import { searchUser } from "../controllers/UserController";

const router = express.Router();

router.get("/search-user", authMiddleware, searchUser);

export default router;
