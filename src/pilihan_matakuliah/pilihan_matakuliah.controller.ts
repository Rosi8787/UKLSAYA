import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PilihanMatakuliahService } from './pilihan_matakuliah.service';
import { PilihMatakuliahDto } from './dto/create-pilihan_matakuliah.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('api/mahasiswa')
export class PilihanMatakuliahController {
  constructor(private service: PilihanMatakuliahService) {}

  // Mahasiswa dapat menambah pilihan (atau admin)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('MAHASISWA','ADMIN')
//   @Post()
// async pilihMatakuliah(@Body() dto: PilihMatakuliahDto) {
//   return this.pilihMatakuliah(dto);
// }

@Post('pilih-matakuliah')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MAHASISWA','ADMIN')
async pilihMatakuliah(@Body() dto: PilihMatakuliahDto) {
  return this.service.pilihMatakuliah(dto);
}

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles('MAHASISWA','ADMIN')
// @Get('jadwal/:mahasiswa_id')
// async lihatJadwal(@Param('mahasiswa_id') mahasiswa_id: number) {
//   return this.service.lihatJadwal(Number(mahasiswa_id));
// }

@Post('jadwal')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MAHASISWA','ADMIN')
async lihatJadwal(@Body('mahasiswa_id') mahasiswa_id: number) {
  return this.service.lihatJadwal(mahasiswa_id);
}


  // // Admin bisa lihat semua
  // @UseGuards(JwtAuthGuard, RolesGuard) 
  // @Roles('ADMIN')
  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

  // // Mahasiswa sendiri lihat pilihannya
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('MAHASISWA','ADMIN')
  // @Get('me')
  // findMine(@Request() req) {
  //   // asumsikan token punya user.email/user.id dan kita simpan nim di user relation (atau frontend kirim nim)
  //   // terbaik: simpan nim di token pada saat login mahasiswa
  //   const nim = req.user.nim;
  //   return this.service.findByMahasiswa(nim);
  // }

  // // Hapus (mahasiswa sendiri atau admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('MAHASISWA','ADMIN')
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(Number(id));
  // }
}
