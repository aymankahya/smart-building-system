import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { createServer } from "http";
import { syncDatabase } from "@/src/config/syncDatabase";

// Configure dotenv to use environement variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

app.use(logger(process.env.ENV === "dev" ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Syncing the databse before starting the server
const handleDatabaseSync = async () => {
  try {
    await syncDatabase();
  } catch (err) {
    console.log("error");
  }
};

handleDatabaseSync();
server.listen(PORT, () => console.log(`Server running at port ${PORT}`));

export default app;
