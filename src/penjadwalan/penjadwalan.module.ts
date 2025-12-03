import { Module } from '@nestjs/common';
import { PenjadwalanService } from './penjadwalan.service';
import { PenjadwalanController } from './penjadwalan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PenjadwalanController],
  providers: [PenjadwalanService],
})
export class PenjadwalanModule {}
