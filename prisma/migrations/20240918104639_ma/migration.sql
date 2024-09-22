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
    "phoneCode" TEXT,
    "phoneNumber" TEXT,
    "role" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "parentId" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DoctroWithSpeciality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "specialityId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "DoctroWithSpeciality_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DoctroWithSpeciality_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Speciality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "SocialMediaByUser" (
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

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icoUrl" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "parentId" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Address_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PROCESO',
    "userId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScheduleDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT,
    "scheduleId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ScheduleDetail_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Quotes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quotes_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuoteDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "starDoctor" INTEGER,
    "descriptionDoctor" TEXT NOT NULL,
    "startDoctorDate" DATETIME NOT NULL,
    "starPatient" INTEGER,
    "descriptionPatient" TEXT NOT NULL,
    "starPatientDate" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "StaticticsMonth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monthNumber" INTEGER NOT NULL,
    "monthName" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
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
    "objectName" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_userId_key" ON "UserDetail"("userId");
