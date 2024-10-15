import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";

export const AccessLog = sequelizeInstance.define(
  "AccessLog",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    response: {
      type: DataTypes.ENUM("granted", "denied"),
      allowNull: false,
    },
  },
  {
    tableName: "access_logs",
    timestamps: false,
  }
);
