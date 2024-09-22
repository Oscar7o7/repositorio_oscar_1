/*
  Warnings:

  - Added the required column `quoteDetailId` to the `Quotes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PROCESO',
    "message" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "quoteDetailId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Quotes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quotes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quotes_quoteDetailId_fkey" FOREIGN KEY ("quoteDetailId") REFERENCES "QuoteDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Quotes" ("createAt", "doctorId", "id", "isDelete", "message", "patientId", "status", "updateAt") SELECT "createAt", "doctorId", "id", "isDelete", "message", "patientId", "status", "updateAt" FROM "Quotes";
DROP TABLE "Quotes";
ALTER TABLE "new_Quotes" RENAME TO "Quotes";
CREATE UNIQUE INDEX "Quotes_quoteDetailId_key" ON "Quotes"("quoteDetailId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;