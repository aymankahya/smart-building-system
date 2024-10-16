import { loginController } from "@/src/controllers/authentication/loginController";
import { signupController } from "@/src/controllers/authentication/signupController";
import { isAdmin } from "@/src/middlewares/isAdmin";
import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.post("/login", loginController); // Add Controllers and Sanitize the inputs
authRouter.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  signupController
); // Add Controllers and Sanitize the inputs
