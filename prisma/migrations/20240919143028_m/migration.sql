/*
  Warnings:

  - You are about to drop the column `am` on the `ScheduleTime` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduleTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
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
INSERT INTO "new_ScheduleTime" ("createAt", "day", "id", "isDelete", "scheduleId", "time_end", "time_start", "updateAt") SELECT "createAt", "day", "id", "isDelete", "scheduleId", "time_end", "time_start", "updateAt" FROM "ScheduleTime";
DROP TABLE "ScheduleTime";
ALTER TABLE "new_ScheduleTime" RENAME TO "ScheduleTime";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
