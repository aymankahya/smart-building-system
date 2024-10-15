import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const IntrusionAlarm = sequelizeInstance.define(
  "IntrusionAlarm",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    tableName: "intrusion_alarms",
    timestamps: false,
  }
);
