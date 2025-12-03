import { Test, TestingModule } from '@nestjs/testing';
import { PilihanMatakuliahService } from './pilihan_matakuliah.service';

describe('PilihanMatakuliahService', () => {
  let service: PilihanMatakuliahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PilihanMatakuliahService],
    }).compile();

    service = module.get<PilihanMatakuliahService>(PilihanMatakuliahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
