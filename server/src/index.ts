import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskBoardRoutes from "./routes/taskBoardRoutes";
import taskColumnRoutes from "./routes/taskColumnRoutes";
import taskRoutes from "./routes/taskRoutes";
import { initializeDB } from "./db";
import swaggerDocs from "./utils/swagger";

dotenv.config();

const app = express();
const port = process.env.CUSTOM_PORT || 5001;

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
app.use("/api/task-board", taskBoardRoutes);

// TaskBoard routes
app.use("/api/columns", taskColumnRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  swaggerDocs(app, port);
});
