/*
  Warnings:

  - A unique constraint covering the columns `[nama_matakuliah,id_dosen]` on the table `Matakuliah` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Matakuliah_nama_matakuliah_id_dosen_key` ON `Matakuliah`(`nama_matakuliah`, `id_dosen`);
