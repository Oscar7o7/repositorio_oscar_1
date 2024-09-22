-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuoteDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "starDoctor" INTEGER NOT NULL DEFAULT 0,
    "descriptionDoctor" TEXT NOT NULL DEFAULT '',
    "endDateDoctor" TEXT NOT NULL DEFAULT '',
    "starPatient" INTEGER NOT NULL DEFAULT 0,
    "descriptionPatient" TEXT NOT NULL DEFAULT '',
    "endDatePatient" TEXT NOT NULL DEFAULT '',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_QuoteDetail" ("createAt", "descriptionDoctor", "descriptionPatient", "id", "isDelete", "starDoctor", "starPatient", "updateAt") SELECT "createAt", "descriptionDoctor", "descriptionPatient", "id", "isDelete", "starDoctor", "starPatient", "updateAt" FROM "QuoteDetail";
DROP TABLE "QuoteDetail";
ALTER TABLE "new_QuoteDetail" RENAME TO "QuoteDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
