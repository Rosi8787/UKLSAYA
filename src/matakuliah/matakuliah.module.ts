import { Module } from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { MatakuliahController } from './matakuliah.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MatakuliahController],
  providers: [MatakuliahService],
})
export class MatakuliahModule {}
