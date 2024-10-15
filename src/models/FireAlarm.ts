import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const FireAlarm = sequelizeInstance.define(
  "FireAlarm",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    tableName: "fire_alarms",
    timestamps: false,
  }
);
