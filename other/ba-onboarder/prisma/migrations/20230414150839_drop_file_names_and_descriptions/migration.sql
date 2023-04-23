/*
  Warnings:

  - You are about to drop the column `description` on the `ContractFile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ContractFile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ContractFile_name_key";

-- AlterTable
ALTER TABLE "ContractFile" DROP COLUMN "description",
DROP COLUMN "name";
