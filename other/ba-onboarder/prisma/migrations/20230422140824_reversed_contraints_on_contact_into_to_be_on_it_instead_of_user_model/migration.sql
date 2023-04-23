/*
  Warnings:

  - You are about to drop the column `contactInfoId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ContactInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactInfoId_fkey";

-- DropIndex
DROP INDEX "User_contactInfoId_key";

-- AlterTable
ALTER TABLE "ContactInfo" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactInfoId";

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_userId_key" ON "ContactInfo"("userId");

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
