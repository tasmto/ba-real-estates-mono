-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactInfoId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "contactInfoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
