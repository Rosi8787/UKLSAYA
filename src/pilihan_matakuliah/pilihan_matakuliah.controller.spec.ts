import { Test, TestingModule } from '@nestjs/testing';
import { PilihanMatakuliahController } from './pilihan_matakuliah.controller';
import { PilihanMatakuliahService } from './pilihan_matakuliah.service';

describe('PilihanMatakuliahController', () => {
  let controller: PilihanMatakuliahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PilihanMatakuliahController],
      providers: [PilihanMatakuliahService],
    }).compile();

    controller = module.get<PilihanMatakuliahController>(PilihanMatakuliahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
