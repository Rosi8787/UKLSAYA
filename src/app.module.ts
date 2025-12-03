import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DosenModule } from './dosen/dosen.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { PenjadwalanModule } from './penjadwalan/penjadwalan.module';
import { AnalisisModule } from './analisis/analisis.module';
import { AuthModule } from './auth/auth.module';
import { PilihanMatakuliahModule } from './pilihan_matakuliah/pilihan_matakuliah.module';

@Module({
  imports: [PrismaModule, DosenModule, MatakuliahModule, MahasiswaModule, PenjadwalanModule, AnalisisModule, AuthModule, PilihanMatakuliahModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
