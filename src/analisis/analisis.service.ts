import { Injectable } from '@nestjs/common';
import { CreateAnalisiDto } from './dto/create-analisi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalisisService {
  constructor(private prisma: PrismaService) {}

  async topMatakuliahDosen(dto: CreateAnalisiDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;
    const skip = (page - 1) * limit;

    const mkFilter: any = {};

    if (dto.semester) {
      mkFilter.jadwal = { some: { semester: dto.semester } };
    }

    if (dto.tahun_ajaran) {
      mkFilter.jadwal = {
        ...(mkFilter.jadwal || {}),
        some: { tahunAjaran: dto.tahun_ajaran },
      };
    }

    const topMatakuliah = await this.prisma.mahasiswaMatakuliah.groupBy({
      by: ['matakuliahId'],
      _count: { matakuliahId: true },
      orderBy: { _count: { matakuliahId: 'desc' } },
      skip: skip,
      take: limit,
    });

    const mkIds = topMatakuliah.map((t) => t.matakuliahId);

    const mkDetail = await this.prisma.matakuliah.findMany({
      where: {
        id_matakuliah: { in: mkIds },
        ...(Object.keys(mkFilter).length > 0 ? mkFilter : {}),
      },
      include: { dosen: true, jadwal: true },
    });

    const formattedTopMatakuliah = topMatakuliah
      .map((item) => {
        const mk = mkDetail.find((m) => m.id_matakuliah === item.matakuliahId);
        if (!mk) return null;

        return {
          id_matakuliah: mk.id_matakuliah,
          nama_matakuliah: mk.nama_matakuliah,
          nama_dosen: mk.dosen.nama,
          total_mahasiswa_memilih: item._count.matakuliahId,
          semester: mk.jadwal[0]?.semester,
          tahunAjaran: mk.jadwal[0]?.tahunAjaran,
        };
      })
      .filter((x) => x !== null);

    const topDosen = await this.prisma.mahasiswaMatakuliah.groupBy({
      by: ['matakuliahId'],
      _count: true,
      orderBy: { _count: { matakuliahId: 'desc' } },
      skip: skip,
      take: limit,
    });

    const topDosenMkIds = topDosen.map((t) => t.matakuliahId);

    const dosenDetails = await this.prisma.matakuliah.findMany({
      where: {
        id_matakuliah: { in: topDosenMkIds },
        ...(Object.keys(mkFilter).length > 0 ? mkFilter : {}),
      },
      include: { dosen: true, jadwal: true },
    });

    const formattedTopDosen = topDosen
      .map((item) => {
        const mk = dosenDetails.find(
          (m) => m.id_matakuliah === item.matakuliahId,
        );
        if (!mk) return null;

        return {
          id_dosen: mk.dosen.nidn,
          nama_dosen: mk.dosen.nama,
          total_pengambilan_matakuliah: item._count,
          semester: mk.jadwal[0]?.semester,
          tahunAjaran: mk.jadwal[0]?.tahunAjaran,
        };
      })
      .filter((x) => x !== null);

    return {
      status: 'success',
      message: 'Analisis berhasil diambil',
      pagination: {
        page,
        limit,
        skip,
      },
      data: {
        top_matakuliah: formattedTopMatakuliah,
        top_dosen: formattedTopDosen,
      },
    };
  }
}
