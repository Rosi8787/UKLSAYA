-- CreateTable
CREATE TABLE `PemilihanMatakuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswaNim` VARCHAR(191) NOT NULL,
    `matakuliahId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PemilihanMatakuliah_mahasiswaNim_idx`(`mahasiswaNim`),
    INDEX `PemilihanMatakuliah_matakuliahId_idx`(`matakuliahId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PemilihanMatakuliah` ADD CONSTRAINT `PemilihanMatakuliah_mahasiswaNim_fkey` FOREIGN KEY (`mahasiswaNim`) REFERENCES `Mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PemilihanMatakuliah` ADD CONSTRAINT `PemilihanMatakuliah_matakuliahId_fkey` FOREIGN KEY (`matakuliahId`) REFERENCES `Matakuliah`(`id_matakuliah`) ON DELETE RESTRICT ON UPDATE CASCADE;
