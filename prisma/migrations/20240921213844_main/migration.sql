-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialMediaByUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "socialMediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "SocialMediaByUser_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "SocialMedia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialMediaByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SocialMediaByUser" ("createAt", "id", "isDelete", "link", "socialMediaId", "updateAt", "userId", "username") SELECT "createAt", "id", "isDelete", "link", "socialMediaId", "updateAt", "userId", "username" FROM "SocialMediaByUser";
DROP TABLE "SocialMediaByUser";
ALTER TABLE "new_SocialMediaByUser" RENAME TO "SocialMediaByUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
