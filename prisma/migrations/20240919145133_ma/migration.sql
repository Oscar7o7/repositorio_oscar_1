/*
  Warnings:

  - You are about to drop the column `primary` on the `ScheduleTime` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("createAt", "description", "id", "isDelete", "updateAt", "userId") SELECT "createAt", "description", "id", "isDelete", "updateAt", "userId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_ScheduleTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "day_index" INTEGER NOT NULL DEFAULT 0,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT,
    "start_payload" TEXT NOT NULL DEFAULT 'am',
    "end_payload" TEXT NOT NULL DEFAULT 'pm',
    "scheduleId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ScheduleTime_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleTime" ("createAt", "day", "day_index", "end_payload", "id", "isDelete", "scheduleId", "start_payload", "time_end", "time_start", "updateAt") SELECT "createAt", "day", "day_index", "end_payload", "id", "isDelete", "scheduleId", "start_payload", "time_end", "time_start", "updateAt" FROM "ScheduleTime";
DROP TABLE "ScheduleTime";
ALTER TABLE "new_ScheduleTime" RENAME TO "ScheduleTime";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
