import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenjadwalanService {
   constructor(private prisma: PrismaService) {}

  async create(dto: CreatePenjadwalanDto) {
    const { hari, jam_mulai, jam_selesai, ruang, dosenNidn, matakuliahId } = dto;

    // 1. Validasi dosen
    const dosen = await this.prisma.dosen.findUnique({
      where: { nidn: dosenNidn },
    });

    if (!dosen) {
      throw new NotFoundException('Dosen tidak ditemukan');
    }

    // 2. Validasi matakuliah
    const mk = await this.prisma.matakuliah.findUnique({
      where: { id_matakuliah: matakuliahId },
    });

    if (!mk) {
      throw new NotFoundException('Matakuliah tidak ditemukan');
    }

    // 3. Validasi jam
    if (jam_mulai >= jam_selesai) {
      throw new BadRequestException('Jam mulai harus lebih kecil dari jam selesai');
    }

    // 4. Buat jadwal
    const create = await this.prisma.penjadwalan.create({
      data: {
        hari,
        jam_mulai,
        jam_selesai,
        ruang,
        dosenNidn,
        matakuliahId,
      },
    });

    return {
      status: 'success',
      message: 'Penjadwalan berhasil dibuat',
      data: create,
    };
  }

  async findAll() {
    return this.prisma.penjadwalan.findMany({
      include: {
        dosen: true,
        matakuliah: true,
      },
    });
  }

  async findOne(id: number) {
    const jadwal = await this.prisma.penjadwalan.findUnique({
      where: { id },
      include: {
        dosen: true,
        matakuliah: true,
      },
    });

    if (!jadwal) throw new NotFoundException('Jadwal tidak ditemukan');

    return jadwal;
  }

  async update(id: number, dto: CreatePenjadwalanDto) {
    const { jam_mulai, jam_selesai, dosenNidn, matakuliahId } = dto;

    if (jam_mulai >= jam_selesai) {
      throw new BadRequestException('Jam mulai harus lebih kecil dari jam selesai');
    }

    const dosen = await this.prisma.dosen.findUnique({ where: { nidn: dosenNidn } });
    if (!dosen) throw new NotFoundException('Dosen tidak ditemukan');

    const mk = await this.prisma.matakuliah.findUnique({
      where: { id_matakuliah: matakuliahId },
    });
    if (!mk) throw new NotFoundException('Matakuliah tidak ditemukan');

    const update = await this.prisma.penjadwalan.update({
      where: { id },
      data: dto,
    });

    return {
      status: 'success',
      message: 'Penjadwalan berhasil diupdate',
      data: update,
    };
  }

  async remove(id: number) {
    await this.prisma.penjadwalan.delete({
      where: { id },
    });

    return {
      status: 'success',
      message: 'Penjadwalan berhasil dihapus',
    };
  }
}
