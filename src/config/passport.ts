import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import dotenv from "dotenv";
import { User } from "@/src/models/User";

dotenv.config();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUBLIC_KEY ?? "secret", // Update with Public Key Value
  algorithms: ["RS256"],
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub); // Find the user by their ID in JWT payload
    if (user) {
      return done(null, user); // User found
    } else {
      return done(null, false); // User not found
    }
  } catch (error) {
    return done(error, false);
  }
});

export default strategy;
