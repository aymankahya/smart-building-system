import { sequelizeInstance } from "@/src/config/database";
import { AccessLog } from "@/src/models/AccessLog";
import { Door } from "@/src/models/Door";
import { DoorInstance } from "@/src/types/Door";
import { QueryTypes } from "sequelize";

export const lockDoorsUnauthorizedAccess = async (
  checkPeriod: number,
  attemptsNumber: number
) => {
  const timeQuery = new Date(Date.now() - checkPeriod * 60 * 1000);

  try {
    const doorsWithUnauthorizedAccessAttempts = await sequelizeInstance.query(
      `SELECT "door", COUNT("door") AS "attemptCount"
   FROM "access_logs"
   WHERE "response" = 'denied' AND "time" > :timeQuery
   GROUP BY "door"
   HAVING COUNT("door") >= :attemptsNumber`,
      {
        replacements: { timeQuery, attemptsNumber },
        type: QueryTypes.SELECT,
      }
    );

    // Lock the doors that were found
    for (const result of doorsWithUnauthorizedAccessAttempts) {
      await Door.update(
        { status: "locked" },
        {
          where: {
            id: (result as { door: string; attemptCount: number }).door,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
