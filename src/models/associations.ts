import { AccessLog } from "@/src/models/AccessLog";
import { Alarm } from "@/src/models/Alarm";
import { Door } from "@/src/models/Door";
import { FireAlarm } from "@/src/models/FireAlarm";
import { IntrusionAlarm } from "@/src/models/IntrusionAlarm";
import { User } from "@/src/models/User";

// User has many AccessLogs
User.hasMany(AccessLog, { foreignKey: "user" });
AccessLog.belongsTo(User, { foreignKey: "user" });

// Door has many AccessLogs
Door.hasMany(AccessLog, { foreignKey: "door" });
AccessLog.belongsTo(Door, { foreignKey: "door" });

// Alarm has one FireAlarm and one IntrusionAlarm
Alarm.hasOne(FireAlarm, { foreignKey: "alarmId" });
FireAlarm.belongsTo(Alarm, { foreignKey: "alarmId" });

Alarm.hasOne(IntrusionAlarm, { foreignKey: "alarmId" });
IntrusionAlarm.belongsTo(Alarm, { foreignKey: "alarmId" });

// IntrusionAlarm belongs to Door
IntrusionAlarm.belongsTo(Door, { foreignKey: "door" });

export { User, Door, AccessLog, Alarm, FireAlarm, IntrusionAlarm };
