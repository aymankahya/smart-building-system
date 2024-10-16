import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cron from "node-cron";
import { createServer } from "https";
import { syncDatabase } from "@/src/config/syncDatabase";
import { authRouter } from "@/src/routes/authRouter";
import { lockDoorsUnauthorizedAccess } from "@/src/services/lockDoorsUnauthorizedAccess";
import passport from "passport";
import strategy from "@/src/config/passport";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import { weatherRouter } from "@/src/routes/weatherRouter";

// Configure dotenv to use environement variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Load SSL Certificate and Private for HTTPS server credentials

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./keys/ssl/key.pem"),
  "utf-8"
);

const certificate = fs.readFileSync(
  path.resolve(__dirname, "./keys/ssl/cert.pem"),
  "utf-8"
);

const server = createServer({ key: privateKey, cert: certificate }, app);

app.use(logger(process.env.ENV === "dev" ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Secure HTTPS server via Helmet (sets HTTP response headers to strengthen security)
app.use(helmet());

// Initialize passport JWT strategy
passport.use(strategy);

//Authentication route for login, generating API token and signing up new user (only possible via admin users)
app.use("/auth", authRouter);

// Weather functionnality endpoint route
app.use("/", weatherRouter);

// Crone job for checking unauthorized access attempts on doors every 10 minutes
const CHECK_PERIOD = 10;
const ATTEMPS_THRESHOLD = 5;
cron.schedule(`*/${CHECK_PERIOD} * * * *`, async () => {
  console.log("Running unauthorized access attempts to doors check");
  await lockDoorsUnauthorizedAccess(CHECK_PERIOD, ATTEMPS_THRESHOLD);
});

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
