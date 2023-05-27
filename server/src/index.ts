import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5001;

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is running!",
    author: "admin",
  });
});
