import { UserInstance } from "@/src/types/User";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const issueToken = (
  user: UserInstance,
  validityDuration: string | number | undefined
) => {
  const id = user.id;
  const payload = {
    sub: id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedToken = sign(payload, process.env.PRIVATE_KEY ?? "private_key", {
    expiresIn: validityDuration,
    algorithm: "RS256",
  });

  return `Bearer ${signedToken}`;
};

export default issueToken;
