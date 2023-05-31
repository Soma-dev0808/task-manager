import { User } from "../models/User";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken, verifyToken } from "../utils/jwt";
import { AppDataSource } from "../db";

export const register = async (req: Request, res: Response) => {
  const { user_name, email_address, password } = req.body;
  try {
    const isUserExists = await AppDataSource.manager.findOne(User, {
      where: { user_name },
    });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    const user = new User();
    user.user_name = user_name;
    user.email_address = email_address;
    user.password = await hashPassword(password);

    const savedUser = await AppDataSource.manager.save(user);

    const token = generateToken({
      user_id: savedUser.user_id,
      user_name: savedUser.user_name,
    });

    return res.status(200).json({
      message: "User created successfully!",
      user: {
        user_id: savedUser.user_id,
        user_name: savedUser.user_name,
        email_address: savedUser.email_address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { user_name, password } = req.body;
  try {
    const user = await AppDataSource.manager.findOne(User, {
      where: { user_name },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }

    const token = generateToken({
      user_id: user.user_id,
      user_name: user.user_name,
    });

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email_address: user.email_address,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
