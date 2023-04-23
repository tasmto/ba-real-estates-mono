-- DropForeignKey
ALTER TABLE "ContractFile" DROP CONSTRAINT "ContractFile_userId_fkey";

-- AddForeignKey
ALTER TABLE "ContractFile" ADD CONSTRAINT "ContractFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
