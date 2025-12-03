import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MahasiswaDto } from './dto/mahasiswa.dto';

@Injectable()
export class MahasiswaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: MahasiswaDto) {
    try {
      const mahasiswa = await this.prisma.mahasiswa.create({
        data: {
          nim: dto.nim,
          nama: dto.nama,
          jenis_kelamin: dto.jenis_kelamin,
          jurusan: dto.jurusan,
          userId: dto.userId,
        },
      });

      return {
        status: true,
        message: 'Mahasiswa berhasil ditambahkan',
        data: mahasiswa,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal menambahkan mahasiswa',
        error: error.message,
        data: null,
      };
    }
  }

  async findAll() {
    const data = await this.prisma.mahasiswa.findMany();
    return {
      status: true,
      message: 'Data mahasiswa',
      data,
    };
  }

  async update(nim: string, dto: MahasiswaDto) {
    try {
      await this.prisma.mahasiswa.findUnique({ where: { nim } });

      const upd = await this.prisma.mahasiswa.update({
        where: { nim },
        data: {
          nama: dto.nama,
          jenis_kelamin: dto.jenis_kelamin,
          jurusan: dto.jurusan,
          userId: dto.userId,
        },
      });

      return {
        status: true,
        message: 'Mahasiswa berhasil diupdate',
        data: upd,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal update mahasiswa',
        error: error.message,
        data: null,
      };
    }
  }

  async delete(nim: string) {
    try {
      await this.prisma.mahasiswa.delete({ where: { nim } });

      return {
        status: true,
        message: 'Mahasiswa berhasil dihapus',
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal menghapus mahasiswa',
        error: error.message,
        data: null,
      };
    }
  }
}
