/*
  Warnings:

  - Added the required column `tanggal` to the `Izin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Izin` ADD COLUMN `tanggal` VARCHAR(191) NOT NULL;
