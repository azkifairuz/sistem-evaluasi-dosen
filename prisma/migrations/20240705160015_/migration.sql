/*
  Warnings:

  - You are about to alter the column `jam` on the `RiwayatMasuk` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `tanggal` on the `RiwayatMasuk` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.

*/
-- AlterTable
ALTER TABLE `RiwayatMasuk` MODIFY `jam` TIME NOT NULL,
    MODIFY `tanggal` DATE NOT NULL;
