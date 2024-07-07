/*
  Warnings:

  - Added the required column `status` to the `SemesterAktif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SemesterAktif` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL;
