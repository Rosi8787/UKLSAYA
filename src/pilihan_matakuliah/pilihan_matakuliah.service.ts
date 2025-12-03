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
      return { status: 'error', message: 'Mahasiswa tidak ditemukan' };
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
      return {
        status: 'error',
        message: 'Total SKS kurang dari 15. Silakan tambah matakuliah.',
      };
    }

    if (totalSKS > 23) {
      return {
        status: 'error',
        message: 'Total SKS melebihi 23. Silakan kurangi matakuliah.',
      };
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
              return { status: 'error', message: 'Jadwal bentrok' };
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
      status: 'success',
      message: 'Matakuliah berhasil dipilih',
      data: {
        mahasiswa_id,
        matakuliah_ids,
        total_sks: totalSKS,
      },
    };
  }

  async lihatJadwal(mahasiswa_id: number) {
  // 1. Cek mahasiswa
  const mahasiswa = await this.prisma.mahasiswa.findUnique({
    where: { id: mahasiswa_id },
  });

  if (!mahasiswa) {
    return { status: "error", message: "Mahasiswa tidak ditemukan" };
  }

  // 2. Ambil daftar matakuliah yang sudah dipilih mahasiswa
  const pilihan = await this.prisma.mahasiswaMatakuliah.findMany({
    where: { mahasiswaNim: mahasiswa.nim },
    include: {
      matakuliah: {
        include: {
          jadwal: true,
        }
      }
    }
  });

  if (pilihan.length === 0) {
    return {
      status: "error",
      message: "Belum ada matakuliah terpilih / jadwal",
    };
  }

  // 3. Format output sesuai PDF
  const jadwal = pilihan.map((p) => ({
    id_matakuliah: p.matakuliah.id_matakuliah,
    nama_matakuliah: p.matakuliah.nama_matakuliah,
    jadwal: p.matakuliah.jadwal.map(j =>
      `${j.hari}, ${j.jam_mulai} - ${j.jam_selesai}, ruang ${j.ruang}`
    )
  }));

  return {
    status: "success",
    message: "Jadwal berhasil diambil",
    data: {
      mahasiswa_id,
      jadwal,
    },
  };
}


  // async lihatJadwal(mahasiswa_id: number) {
  //   // 1. Cek mahasiswa
  //   const mahasiswa = await this.prisma.mahasiswa.findUnique({
  //     where: { id: mahasiswa_id },
  //   });

  //   if (!mahasiswa) {
  //     return { status: 'error', message: 'Mahasiswa tidak ditemukan' };
  //   }

  //   // 2. Ambil pilihan matakuliah mahasiswa
  //   const pilihan = await this.prisma.mahasiswaMatakuliah.findMany({
  //     where: { mahasiswaNim: mahasiswa.nim },
  //     include: {
  //       matakuliah: {
  //         include: { jadwal: true },
  //       },
  //     },
  //   });

  //   if (pilihan.length === 0) {
  //     return { status: 'error', message: 'Belum ada matakuliah dipilih' };
  //   }

  //   // 3. Format sesuai PDF
  //   const jadwalFormatted = pilihan.map((p) => ({
  //     id_matakuliah: p.matakuliah.id_matakuliah,
  //     nama_matakuliah: p.matakuliah.nama_matakuliah,
  //     jadwal: p.matakuliah.jadwal
  //       .map((j) => `${j.hari}, ${j.jam_mulai} - ${j.jam_selesai}`)
  //       .join('; '),
  //   }));

  //   return {
  //     status: 'success',
  //     message: 'Jadwal berhasil diambil',
  //     data: {
  //       mahasiswa_id,
  //       jadwal: jadwalFormatted,
  //     },
  //   };
  // }
}
