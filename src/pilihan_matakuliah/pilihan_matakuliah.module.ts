import { Module } from '@nestjs/common';
import { PilihanMatakuliahService } from './pilihan_matakuliah.service';
import { PilihanMatakuliahController } from './pilihan_matakuliah.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PilihanMatakuliahController],
  providers: [PilihanMatakuliahService],
})
export class PilihanMatakuliahModule {}
