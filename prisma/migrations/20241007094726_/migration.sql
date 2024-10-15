/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `ordinateur` DROP FOREIGN KEY `Ordinateur_employeId_fkey`;

-- AlterTable
ALTER TABLE `ordinateur` MODIFY `employeId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Entreprise_mail_key` ON `Entreprise`(`mail`);

-- AddForeignKey
ALTER TABLE `Ordinateur` ADD CONSTRAINT `Ordinateur_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
