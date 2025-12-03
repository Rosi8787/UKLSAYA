import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PilihanMatakuliahService } from './pilihan_matakuliah.service';
import { PilihMatakuliahDto } from './dto/create-pilihan_matakuliah.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('pilihan')
export class PilihanMatakuliahController {
  constructor(private service: PilihanMatakuliahService) {}

  // Mahasiswa dapat menambah pilihan (atau admin)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('MAHASISWA','ADMIN')
//   @Post()
// async pilihMatakuliah(@Body() dto: PilihMatakuliahDto) {
//   return this.pilihMatakuliah(dto);
// }

@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MAHASISWA','ADMIN')
async pilihMatakuliah(@Body() dto: PilihMatakuliahDto) {
  return this.service.pilihMatakuliah(dto);
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
