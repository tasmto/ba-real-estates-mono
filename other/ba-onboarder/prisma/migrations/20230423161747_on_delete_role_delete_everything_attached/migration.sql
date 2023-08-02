-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_stepCollectionId_fkey";

-- DropForeignKey
ALTER TABLE "StepCollection" DROP CONSTRAINT "StepCollection_roleId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "StepCollection" ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "isArchived" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "StepCollection" ADD CONSTRAINT "StepCollection_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "ContractTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_stepCollectionId_fkey" FOREIGN KEY ("stepCollectionId") REFERENCES "StepCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
