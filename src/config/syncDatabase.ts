import { sequelizeInstance } from "@/src/config/database";
import {
  User,
  Door,
  AccessLog,
  Alarm,
  FireAlarm,
  IntrusionAlarm,
} from "@/src/models/associations";

export const syncDatabase = async () => {
  try {
    // Load models (ES6 imports don't run the modules unless they are called in the module)
    const models = [User, Door, AccessLog, Alarm, FireAlarm, IntrusionAlarm];
    await sequelizeInstance.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Failed to sync the database: ", error);
  }
};
