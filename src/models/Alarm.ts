import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const Alarm = sequelizeInstance.define(
  "Alarm",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("intrusion", "fire"),
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "alarms",
    timestamps: false,
  }
);
