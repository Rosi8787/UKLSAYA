import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DosenDto } from './dto/dosen.dto';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) {}

  async create(dto: DosenDto) {
    try {
      const dosen = await this.prisma.dosen.create({
        data: dto,
      });

      return {
        status: true,
        message: 'Dosen berhasil ditambahkan',
        data:{
          dosen
        }
      };
    } catch (error) {
      return {
        status: false,
        message: 'Gagal menambahkan dosen',
        error: error.message,
        data: null,
      };
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.dosen.findMany();

      return {
        status: true,
        message: 'Data dosen',
        data,
      };
    } catch (error) {
      return {
        status: false,
        message: `Something went wrong ${error}`,
        data: null,
      };
    }
  }

  async update(nidn: string, dto: DosenDto) {
    try {
      const exists = await this.prisma.dosen.findUnique({ where: { nidn } });
      if (!exists) throw new NotFoundException('Dosen tidak ditemukan');

      const dosen = await this.prisma.dosen.update({
        where: { nidn },
        data: dto,
      });

      return {
        status: true,
        message: 'Dosen berhasil diupdate',
        data: dosen,
      };
    } catch (error) {
      return {
        status: false,
        message: `Dosen tidak berhasil diupdate ${error}`,
        data: null,
      };
    }
  }

  async delete(nidn: string) {
    try {
      const exists = await this.prisma.dosen.findUnique({ where: { nidn } });
      if (!exists) throw new NotFoundException('Dosen tidak ditemukan');

      await this.prisma.dosen.delete({ where: { nidn } });

      return {
        status: true,
        message: 'Dosen berhasil dihapus',
        data: null,
      };
    } catch (error) {
      return {
        status: false,
        message: `Dosen tidak berhasil dihapus ${error}`,
        data: null,
      };
    }
  }
}
