-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL DEFAULT 'default',
    "descriptionAlt" TEXT NOT NULL DEFAULT '',
    "objectName" TEXT,
    "objectId" TEXT,
    "objectReference" BOOLEAN DEFAULT false,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("createAt", "description", "id", "objectId", "objectName", "objectReference", "userId") SELECT "createAt", "description", "id", "objectId", "objectName", "objectReference", "userId" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
