import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatakuliahDto } from './dto/matakuliah.dto';

@Injectable()
export class MatakuliahService {
  constructor(private prisma: PrismaService) {}

  // CREATE
 async create(data: MatakuliahDto) {
  try {
    const matakuliah = await this.prisma.matakuliah.create({
      data: {
        nama_matakuliah: data.nama_matakuliah,
        sks: data.sks,
        id_dosen: data.id_dosen,
      },
      include: { dosen: true },
    });

    return {
      status: "success",
      message: "Matakuliah added successfully",
      data: matakuliah,
    };

  } catch (error) {

    if (error.code === 'P2002') {
      return {
        status: "error",
        message: "Matakuliah sudah ada (duplikat)",
        meta: error.meta,
      };
    }

    return {
      status: "error",
      message: "Failed to add matakuliah",
      error: error.message,
    };
  }
}

  // READ ALL
  async findAll() {
    const list = await this.prisma.matakuliah.findMany({
      include: {
        dosen: true,
      },
    });

    return {
      status: true,
      message: 'Data seluruh matakuliah',
      data: list.map((m) => ({
        id_matakuliah: m.id_matakuliah,
        nama_matakuliah: m.nama_matakuliah,
        id_dosen: m.id_dosen,
        sks: m.sks,
        dosen: m.dosen,
      })),
    };
  }

  // UPDATE
  async update(id_matakuliah: number, dto: MatakuliahDto) {
    try {
      const exists = await this.prisma.matakuliah.findUnique({
        where: { id_matakuliah },
      });

      if (!exists) throw new NotFoundException('Matakuliah tidak ditemukan');

      const updated = await this.prisma.matakuliah.update({
        where: { id_matakuliah },
        data: {
          nama_matakuliah: dto.nama_matakuliah,
          sks: dto.sks,
          id_dosen: dto.id_dosen,
        },
      });

      return {
        status: true,
        message: 'Matakuliah berhasil diupdate',
        data: updated,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal update matakuliah',
        error: error.message,
        data: null,
      };
    }
  }

  // DELETE
  async delete(id_matakuliah: number) {
    try {
      await this.prisma.matakuliah.delete({
        where: { id_matakuliah },
      });

      return {
        status: true,
        message: 'Matakuliah berhasil dihapus',
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal menghapus matakuliah',
        error: error.message,
        data: null,
      };
    }
  }
}
