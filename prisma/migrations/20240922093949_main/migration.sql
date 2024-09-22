-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaticticsMonth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monthNumber" INTEGER NOT NULL,
    "monthName" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectReference" BOOLEAN NOT NULL DEFAULT false,
    "totalMonth" INTEGER NOT NULL,
    "totalDay1" INTEGER NOT NULL,
    "totalDay2" INTEGER NOT NULL,
    "totalDay3" INTEGER NOT NULL,
    "totalDay4" INTEGER NOT NULL,
    "totalDay5" INTEGER NOT NULL,
    "totalDay6" INTEGER NOT NULL,
    "totalDay7" INTEGER NOT NULL,
    "totalDay8" INTEGER NOT NULL,
    "totalDay9" INTEGER NOT NULL,
    "totalDay10" INTEGER NOT NULL,
    "totalDay11" INTEGER NOT NULL,
    "totalDay12" INTEGER NOT NULL,
    "totalDay13" INTEGER NOT NULL,
    "totalDay14" INTEGER NOT NULL,
    "totalDay15" INTEGER NOT NULL,
    "totalDay16" INTEGER NOT NULL,
    "totalDay17" INTEGER NOT NULL,
    "totalDay18" INTEGER NOT NULL,
    "totalDay19" INTEGER NOT NULL,
    "totalDay20" INTEGER NOT NULL,
    "totalDay21" INTEGER NOT NULL,
    "totalDay22" INTEGER NOT NULL,
    "totalDay23" INTEGER NOT NULL,
    "totalDay24" INTEGER NOT NULL,
    "totalDay25" INTEGER NOT NULL,
    "totalDay26" INTEGER NOT NULL,
    "totalDay27" INTEGER NOT NULL,
    "totalDay28" INTEGER NOT NULL,
    "totalDay29" INTEGER NOT NULL,
    "totalDay30" INTEGER NOT NULL,
    "totalDay31" INTEGER NOT NULL
);
INSERT INTO "new_StaticticsMonth" ("id", "monthLabel", "monthName", "monthNumber", "objectId", "objectName", "totalDay1", "totalDay10", "totalDay11", "totalDay12", "totalDay13", "totalDay14", "totalDay15", "totalDay16", "totalDay17", "totalDay18", "totalDay19", "totalDay2", "totalDay20", "totalDay21", "totalDay22", "totalDay23", "totalDay24", "totalDay25", "totalDay26", "totalDay27", "totalDay28", "totalDay29", "totalDay3", "totalDay30", "totalDay31", "totalDay4", "totalDay5", "totalDay6", "totalDay7", "totalDay8", "totalDay9", "totalMonth") SELECT "id", "monthLabel", "monthName", "monthNumber", "objectId", "objectName", "totalDay1", "totalDay10", "totalDay11", "totalDay12", "totalDay13", "totalDay14", "totalDay15", "totalDay16", "totalDay17", "totalDay18", "totalDay19", "totalDay2", "totalDay20", "totalDay21", "totalDay22", "totalDay23", "totalDay24", "totalDay25", "totalDay26", "totalDay27", "totalDay28", "totalDay29", "totalDay3", "totalDay30", "totalDay31", "totalDay4", "totalDay5", "totalDay6", "totalDay7", "totalDay8", "totalDay9", "totalMonth" FROM "StaticticsMonth";
DROP TABLE "StaticticsMonth";
ALTER TABLE "new_StaticticsMonth" RENAME TO "StaticticsMonth";
CREATE TABLE "new_StaticticsYear" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "objectName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectReference" BOOLEAN NOT NULL DEFAULT false,
    "totalYear" INTEGER NOT NULL,
    "totalMonth1" INTEGER NOT NULL,
    "totalMonth2" INTEGER NOT NULL,
    "totalMonth3" INTEGER NOT NULL,
    "totalMonth4" INTEGER NOT NULL,
    "totalMonth5" INTEGER NOT NULL,
    "totalMonth6" INTEGER NOT NULL,
    "totalMonth7" INTEGER NOT NULL,
    "totalMonth8" INTEGER NOT NULL,
    "totalMonth9" INTEGER NOT NULL,
    "totalMonth10" INTEGER NOT NULL,
    "totalMonth11" INTEGER NOT NULL,
    "totalMonth12" INTEGER NOT NULL
);
INSERT INTO "new_StaticticsYear" ("id", "objectId", "objectName", "totalMonth1", "totalMonth10", "totalMonth11", "totalMonth12", "totalMonth2", "totalMonth3", "totalMonth4", "totalMonth5", "totalMonth6", "totalMonth7", "totalMonth8", "totalMonth9", "totalYear", "year") SELECT "id", "objectId", "objectName", "totalMonth1", "totalMonth10", "totalMonth11", "totalMonth12", "totalMonth2", "totalMonth3", "totalMonth4", "totalMonth5", "totalMonth6", "totalMonth7", "totalMonth8", "totalMonth9", "totalYear", "year" FROM "StaticticsYear";
DROP TABLE "StaticticsYear";
ALTER TABLE "new_StaticticsYear" RENAME TO "StaticticsYear";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
