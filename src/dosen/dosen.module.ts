import { Module } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { DosenController } from './dosen.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DosenController],
  providers: [DosenService],
})
export class DosenModule {}
