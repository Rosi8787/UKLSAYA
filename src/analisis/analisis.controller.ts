import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { CreateAnalisiDto } from './dto/create-analisi.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator'; 

@Controller('api/analisis')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalisisController {
  constructor(private service: AnalisisService) {}

  @Roles('ADMIN','MAHASISWA')
  @Post()
  top(@Body() dto: CreateAnalisiDto) {
    return this.service.topMatakuliahDosen(dto);
  }
}
