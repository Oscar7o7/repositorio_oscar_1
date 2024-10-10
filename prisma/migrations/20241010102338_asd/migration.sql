-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Insumo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "useIn" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "priceUnitary" INTEGER NOT NULL DEFAULT 0,
    "isMin" BOOLEAN NOT NULL DEFAULT false,
    "isMax" BOOLEAN NOT NULL DEFAULT false,
    "minStock" INTEGER NOT NULL DEFAULT 0,
    "maxStock" INTEGER NOT NULL DEFAULT 1000,
    "categoryId" TEXT NOT NULL,
    "createId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Insumo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Insumo_createId_fkey" FOREIGN KEY ("createId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Insumo" ("categoryId", "createAt", "createId", "description", "id", "isDelete", "maxStock", "minStock", "name", "priceUnitary", "quantity", "updateAt", "useIn") SELECT "categoryId", "createAt", "createId", "description", "id", "isDelete", "maxStock", "minStock", "name", "priceUnitary", "quantity", "updateAt", "useIn" FROM "Insumo";
DROP TABLE "Insumo";
ALTER TABLE "new_Insumo" RENAME TO "Insumo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
