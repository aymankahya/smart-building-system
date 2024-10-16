import { DataTypes } from "sequelize";
import { compare, genSalt, hash } from "bcrypt";
import { sequelizeInstance } from "@/src/config/database";
import { UserInstance } from "@/src/types/User";

export const User = sequelizeInstance.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

// Hash and Salt the password before creation
User.beforeCreate(async (user: UserInstance) => {
  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
});
