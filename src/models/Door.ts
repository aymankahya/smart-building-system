import { DataTypes } from "sequelize";
import { sequelizeInstance } from "@/src/config/database";
import { DoorInstance } from "@/src/types/Door";

export const Door = sequelizeInstance.define<DoorInstance>(
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
