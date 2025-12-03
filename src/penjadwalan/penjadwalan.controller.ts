import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PenjadwalanService } from './penjadwalan.service';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('api/penjadwalan')
export class PenjadwalanController {
  constructor(private service: PenjadwalanService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreatePenjadwalanDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN','MAHASISWA','DOSEN')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN','MAHASISWA','DOSEN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  } 

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePenjadwalanDto) {
    return this.service.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
