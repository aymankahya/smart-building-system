import { User } from "@/src/models/User";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import issueToken from "@/src/utils/issueJwt";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Validate password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Generate JWT token
    const token = issueToken(user, "1h");
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};
