import { UserInstance } from "@/src/types/User";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Verify the JWT
  verify(token, process.env.PRIVATE_KEY ?? "secret", (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Check if the role is admin
    if ((decoded as UserInstance)?.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }

    next(); // Continue to the sign-up logic
  });
};
