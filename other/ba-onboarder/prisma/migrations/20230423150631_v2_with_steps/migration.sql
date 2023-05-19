-- CreateEnum
CREATE TYPE "SystemRole" AS ENUM ('user', 'manager', 'admin');

-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('contract', 'file', 'content');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "manager_id" TEXT,
    "roleId" TEXT,
    "jobTitle" TEXT NOT NULL DEFAULT 'Agent',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "systemRole" "SystemRole" NOT NULL,
    "stepsProgress" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'not set',
    "phone" TEXT NOT NULL DEFAULT 'not set',
    "telephone" TEXT NOT NULL DEFAULT 'not set',
    "personalEmail" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL DEFAULT 'not set',
    "emergencyContactPhone" TEXT NOT NULL DEFAULT 'not set',
    "emergencyContactEmail" TEXT NOT NULL DEFAULT 'not set',
    "emergencyContactAddress" TEXT NOT NULL DEFAULT 'not set',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "stepsData" JSONB NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "fileLink" TEXT NOT NULL,
    "systemRoleRestriction" "SystemRole" NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "isArchived" BOOLEAN NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "StepCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "StepType" NOT NULL DEFAULT 'content',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "isArchived" BOOLEAN NOT NULL,
    "fileId" TEXT,
    "contractId" TEXT,
    "stepCollectionId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "templateLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractFile" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "fileLink" TEXT,
    "isSigned" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ContractFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "authorId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUserId" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleManagers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FileToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_personalEmail_key" ON "ContactInfo"("personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_businessEmail_key" ON "ContactInfo"("businessEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_userId_key" ON "ContactInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_createdById_updatedById_id_idx" ON "Role"("createdById", "updatedById", "id");

-- CreateIndex
CREATE INDEX "File_createdById_updatedById_id_idx" ON "File"("createdById", "updatedById", "id");

-- CreateIndex
CREATE INDEX "StepCollection_roleId_idx" ON "StepCollection"("roleId");

-- CreateIndex
CREATE INDEX "Step_stepCollectionId_idx" ON "Step"("stepCollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractTemplate_name_key" ON "ContractTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_firstName_lastName_key" ON "Author"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleManagers_AB_unique" ON "_RoleManagers"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleManagers_B_index" ON "_RoleManagers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToRole_AB_unique" ON "_FileToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToRole_B_index" ON "_FileToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToStore_AB_unique" ON "_BookToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToStore_B_index" ON "_BookToStore"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCollection" ADD CONSTRAINT "StepCollection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCollection" ADD CONSTRAINT "StepCollection_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepCollection" ADD CONSTRAINT "StepCollection_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "ContractTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_stepCollectionId_fkey" FOREIGN KEY ("stepCollectionId") REFERENCES "StepCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractFile" ADD CONSTRAINT "ContractFile_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ContractTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractFile" ADD CONSTRAINT "ContractFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleManagers" ADD CONSTRAINT "_RoleManagers_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleManagers" ADD CONSTRAINT "_RoleManagers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToRole" ADD CONSTRAINT "_FileToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToRole" ADD CONSTRAINT "_FileToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToStore" ADD CONSTRAINT "_BookToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToStore" ADD CONSTRAINT "_BookToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
