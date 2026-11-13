/*
  Warnings:

  - A unique constraint covering the columns `[slotTime]` on the table `Consult` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Consult` ADD COLUMN `googleEventId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Consult_slotTime_key` ON `Consult`(`slotTime`);
