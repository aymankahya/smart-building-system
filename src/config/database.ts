import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelizeInstance = new Sequelize(
  process.env.DB_NAME ?? "db_name",
  process.env.DB_USER ?? "db_user",
  process.env.DB_PASSWORD ?? "db_password",
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    logging: false,
  }
);
