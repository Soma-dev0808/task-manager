import { User } from "../models/User";
import { Request, Response } from "express";

const RegisterController = async (req: Request, res: Response) => {
  const { user_name, email_address, password } = req.body;
  try {
    const user = new User();
    user.user_name = user_name;
    user.email_address = email_address;
    user.password = password;

    // await user.save();

    return res.status(200).json({
      message: "User created successfully!",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
