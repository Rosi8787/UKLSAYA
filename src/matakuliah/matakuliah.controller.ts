import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { MatakuliahDto } from './dto/matakuliah.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('matakuliah')
export class MatakuliahController {
  // constructor(private readonly matakuliahService: MatakuliahService) {}

   constructor(private service: MatakuliahService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() dto: MatakuliahDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MatakuliahDto) {
    return this.service.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Delete(':id')
  delete(@Param('id') id: string) { 
    return this.service.delete(Number(id));
  }
}
