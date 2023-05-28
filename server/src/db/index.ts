import { DataSource } from "typeorm";
import path from "path";

// TODO: .env
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "soma",
  password: "test",
  database: "taskboard",
  entities: [path.join(__dirname, "../models/*.ts")],
  synchronize: true,
});

export const initializeDB = async () => {
  await AppDataSource.initialize();
};
