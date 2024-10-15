import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const User = sequelizeInstance.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
