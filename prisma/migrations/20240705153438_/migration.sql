/*
  Warnings:

  - You are about to alter the column `tanggal_lahir` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.

*/
-- AlterTable
ALTER TABLE `Dosen` MODIFY `tanggal_lahir` DATE NOT NULL;
