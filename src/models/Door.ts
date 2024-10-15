import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const Door = sequelizeInstance.define(
  "Door",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("open", "closed", "locked"),
      allowNull: false,
    },
  },
  {
    tableName: "doors",
    timestamps: false,
  }
);
