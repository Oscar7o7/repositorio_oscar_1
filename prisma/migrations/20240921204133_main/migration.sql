-- CreateTable
CREATE TABLE "ConfigDocuments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "use" TEXT,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

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
    CONSTRAINT "SocialMediaByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SocialMediaByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SocialMediaByUser" ("createAt", "id", "isDelete", "link", "socialMediaId", "updateAt", "userId", "username") SELECT "createAt", "id", "isDelete", "link", "socialMediaId", "updateAt", "userId", "username" FROM "SocialMediaByUser";
DROP TABLE "SocialMediaByUser";
ALTER TABLE "new_SocialMediaByUser" RENAME TO "SocialMediaByUser";
CREATE TABLE "new_UserDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "photoId" TEXT,
    "userId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserDetail_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "ConfigDocuments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDetail" ("createAt", "description", "id", "isDelete", "updateAt", "userId") SELECT "createAt", "description", "id", "isDelete", "updateAt", "userId" FROM "UserDetail";
DROP TABLE "UserDetail";
ALTER TABLE "new_UserDetail" RENAME TO "UserDetail";
CREATE UNIQUE INDEX "UserDetail_photoId_key" ON "UserDetail"("photoId");
CREATE UNIQUE INDEX "UserDetail_userId_key" ON "UserDetail"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
