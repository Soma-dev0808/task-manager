import { Response, Request } from "express";
import { AppDataSource } from "../db";
import { User } from "../models/User";

export const searchUser = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (typeof keyword !== "string") {
    return res.status(500).json({
      message: "Please input string!",
    });
  }

  try {
    const userRepository = AppDataSource.manager.getRepository(User);

    const foundUser = await userRepository
      .createQueryBuilder("user")
      .where("user.user_name LIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("user.email_address LIKE :keyword", { keyword: `%${keyword}%` })
      .getMany();

    return res.json(foundUser);
  } catch (error) {
    console.error("Error searching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
