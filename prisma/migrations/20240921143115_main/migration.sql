/*
  Warnings:

  - You are about to drop the column `starPatientDate` on the `QuoteDetail` table. All the data in the column will be lost.
  - You are about to drop the column `startDoctorDate` on the `QuoteDetail` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuoteDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "starDoctor" INTEGER NOT NULL DEFAULT 0,
    "descriptionDoctor" TEXT NOT NULL DEFAULT '',
    "starPatient" INTEGER NOT NULL DEFAULT 0,
    "descriptionPatient" TEXT NOT NULL DEFAULT '',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_QuoteDetail" ("createAt", "descriptionDoctor", "descriptionPatient", "id", "isDelete", "starDoctor", "starPatient", "updateAt") SELECT "createAt", "descriptionDoctor", "descriptionPatient", "id", "isDelete", coalesce("starDoctor", 0) AS "starDoctor", coalesce("starPatient", 0) AS "starPatient", "updateAt" FROM "QuoteDetail";
DROP TABLE "QuoteDetail";
ALTER TABLE "new_QuoteDetail" RENAME TO "QuoteDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
