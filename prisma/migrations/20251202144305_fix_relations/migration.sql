/*
  Warnings:

  - The primary key for the `matakuliah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `matakuliah` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `matakuliah` table. All the data in the column will be lost.
  - Added the required column `id_dosen` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_matakuliah` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_matakuliah` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mahasiswamatakuliah` DROP FOREIGN KEY `MahasiswaMatakuliah_matakuliahId_fkey`;

-- DropForeignKey
ALTER TABLE `penjadwalan` DROP FOREIGN KEY `Penjadwalan_matakuliahId_fkey`;

-- AlterTable
ALTER TABLE `matakuliah` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `nama`,
    ADD COLUMN `id_dosen` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_matakuliah` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nama_matakuliah` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_matakuliah`);

-- AddForeignKey
ALTER TABLE `Matakuliah` ADD CONSTRAINT `Matakuliah_id_dosen_fkey` FOREIGN KEY (`id_dosen`) REFERENCES `Dosen`(`nidn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjadwalan` ADD CONSTRAINT `Penjadwalan_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MahasiswaMatakuliah` ADD CONSTRAINT `MahasiswaMatakuliah_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;
