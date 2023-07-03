import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const getOptions = () => {
  const options: DataSourceOptions = {
    type: "postgres",
  };
  if (process.env.DATABASE_URL) {
    Object.assign(options, {
      url: process.env.DATABASE_URL,
      entities: ["dist/models/*.js"],
      synchronize: false,
    });
  } else {
    Object.assign(options, {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT ?? "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "postgres",
      entities: [path.join(__dirname, "../models/*.ts")],
      synchronize: true,
    });
  }

  return options;
};

export const AppDataSource = new DataSource(getOptions());

export const initializeDB = async () => {
  await AppDataSource.initialize();
};
