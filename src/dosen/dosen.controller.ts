import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { DosenService } from "./dosen.service";
import { DosenDto } from "./dto/dosen.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("dosen")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DosenController {
  constructor(private dosen: DosenService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() dto: DosenDto) {
    return this.dosen.create(dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Get()
  findAll() {
    return this.dosen.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Put(":nidn")
  update(@Param("nidn") nidn: string, @Body() dto: DosenDto) {
    return this.dosen.update(nidn, dto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("ADMIN")
  @Delete(":nidn")
  delete(@Param("nidn") nidn: string) {
    return this.dosen.delete(nidn);
  }
}
