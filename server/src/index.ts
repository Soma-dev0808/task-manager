import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskBoardRoutes from "./routes/taskBoardRoutes";
import { initializeDB } from "./db";

const app = express();
const port = 5001;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

initializeDB().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Auth routes
app.use("/api/auth", authRoutes);

// TaskBoard routes
app.use("/api/taskboard", taskBoardRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
