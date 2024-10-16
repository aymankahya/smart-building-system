import { User } from "@/src/models/User";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const signupController = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const id = uuidv4();
    // Create new user
    await User.create({
      id,
      username,
      password,
      role,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
