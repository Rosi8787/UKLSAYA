import { Injectable } from '@nestjs/common';
import { CreateAnalisiDto } from './dto/create-analisi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalisisService {
  constructor(private prisma: PrismaService) {}

  async topMatakuliahDosen(dto: CreateAnalisiDto) {
    const limit = dto.limit ?? 10;

    const topMatakuliah = await this.prisma.mahasiswaMatakuliah.groupBy({
      by: ['matakuliahId'],
      _count: { matakuliahId: true },
      orderBy: { _count: { matakuliahId: 'desc' } },
      take: limit,
    });

    const mkIds = topMatakuliah.map((t) => t.matakuliahId);

    const mkDetail = await this.prisma.matakuliah.findMany({
      where: { id_matakuliah: { in: mkIds } },
      include: { dosen: true },
    });

    const formattedTopMatakuliah = topMatakuliah
      .map((item) => {
        const mk = mkDetail.find((m) => m.id_matakuliah === item.matakuliahId);

        if (!mk) return null; // FIX ERROR: check undefined

        return {
          id_matakuliah: mk.id_matakuliah,
          nama_matakuliah: mk.nama_matakuliah,
          id_dosen: mk.dosen.nidn,
          nama_dosen: mk.dosen.nama,
          total_mahasiswa_memilih: item._count.matakuliahId,
          total_sks_diambil: mk.sks,
        };
      })
      .filter((item) => item !== null); // Remove null

    const topDosen = await this.prisma.mahasiswaMatakuliah.groupBy({
      by: ['matakuliahId'],
      _count: true,
      orderBy: {
        _count: {
          matakuliahId: 'desc',
        },
      },
      take: limit,
    });

    const topDosenMkIds = topDosen.map((t) => t.matakuliahId);

    const dosenDetails = await this.prisma.matakuliah.findMany({
      where: { id_matakuliah: { in: topDosenMkIds } },
      include: { dosen: true },
    });

    const formattedTopDosen = topDosen
      .map((item) => {
        const mk = dosenDetails.find(
          (m) => m.id_matakuliah === item.matakuliahId,
        );

        if (!mk) return null; // FIX ERROR

        return {
          id_dosen: mk.dosen.nidn,
          nama_dosen: mk.dosen.nama,
          total_mahasiswa_memilih: item._count,
          total_matakuliah_diampu: 1,
          total_pengambilan_matakuliah: item._count,
        };
      })
      .filter((item) => item !== null); // Remove null

    return {
      status: 'success',
      message: 'Analisis berhasil diambil',
      data: {
        top_matakuliah: formattedTopMatakuliah,
        top_dosen: formattedTopDosen,
      },
    };
  }
}
