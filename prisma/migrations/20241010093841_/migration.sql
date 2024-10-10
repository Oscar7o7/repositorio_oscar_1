-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cmeg_n" TEXT,
    "matricula" TEXT,
    "ci" TEXT NOT NULL,
    "createDate" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "UserInInsumo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "insumoId" TEXT NOT NULL,
    "useIn" TEXT NOT NULL,
    CONSTRAINT "UserInInsumo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserInInsumo_insumoId_fkey" FOREIGN KEY ("insumoId") REFERENCES "Insumo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Category_createId_fkey" FOREIGN KEY ("createId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "useIn" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "priceUnitary" INTEGER NOT NULL DEFAULT 0,
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

-- CreateTable
CREATE TABLE "StaticticsMonth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monthNumber" INTEGER NOT NULL,
    "monthName" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "objectName" TEXT,
    "objectId" TEXT,
    "objectReference" BOOLEAN NOT NULL DEFAULT false,
    "year" INTEGER NOT NULL DEFAULT 2024,
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

-- CreateTable
CREATE TABLE "StaticticsYear" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "objectName" TEXT,
    "objectId" TEXT,
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

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "objectName" TEXT,
    "objectId" TEXT,
    "objectReference" BOOLEAN DEFAULT false,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
