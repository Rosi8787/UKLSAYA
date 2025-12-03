import { Injectable, NotFoundException } from '@nestjs/common';
import { PilihMatakuliahDto } from './dto/create-pilihan_matakuliah.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PilihanMatakuliahService {
  constructor(private prisma: PrismaService) {}

  async pilihMatakuliah(dto: PilihMatakuliahDto) {
    const { mahasiswa_id, matakuliah_ids } = dto;

    // 1. Cek mahasiswa
    const mahasiswa = await this.prisma.mahasiswa.findUnique({
      where: { id: mahasiswa_id },
    });

    if (!mahasiswa) {
      return { status: "error", message: "Mahasiswa tidak ditemukan" };
    }

    // 2. Ambil matakuliah + jadwalnya
    const mkList = await this.prisma.matakuliah.findMany({
      where: { id_matakuliah: { in: matakuliah_ids } },
      include: { jadwal: true },
    });

    // 3. Hitung total SKS
    const totalSKS = mkList.reduce((sum, mk) => sum + mk.sks, 0);

    // Validasi SKS sesuai PDF
    if (totalSKS < 15) {
      return { status: "error", message: "Total SKS kurang dari 15. Silakan tambah matakuliah." };
    }

    if (totalSKS > 23) {
      return { status: "error", message: "Total SKS melebihi 23. Silakan kurangi matakuliah." };
    }

    // 4. Cek jadwal bentrok
    for (let i = 0; i < mkList.length; i++) {
      for (let j = i + 1; j < mkList.length; j++) {
        for (const a of mkList[i].jadwal) {
          for (const b of mkList[j].jadwal) {
            if (
              a.hari === b.hari &&
              a.jam_mulai < b.jam_selesai &&
              b.jam_mulai < a.jam_selesai
            ) {
              return { status: "error", message: "Jadwal bentrok" };
            }
          }
        }
      }
    }

    // 5. Hapus pilihan lama
    await this.prisma.mahasiswaMatakuliah.deleteMany({
      where: { mahasiswaNim: mahasiswa.nim },
    });

    // 6. Simpan pilihan baru
    await this.prisma.mahasiswaMatakuliah.createMany({
      data: matakuliah_ids.map((id) => ({
        mahasiswaNim: mahasiswa.nim,
        matakuliahId: id,
      })),
    });

    // 7. Response sesuai PDF
    return {
      status: "success",
      message: "Matakuliah berhasil dipilih",
      data: {
        mahasiswa_id,
        matakuliah_ids,
        total_sks: totalSKS,
      },
    };
  }
}