import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  role: "admin" | "employee";
}

export interface UserInstance
  extends Model<UserAttributes, UserAttributes>,
    UserAttributes {}
