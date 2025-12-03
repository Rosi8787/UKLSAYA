import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAnalisiDto {
  @IsString()
  @IsOptional()
  tahun_ajaran?: string;

  @IsInt()
  @IsOptional()
  semester?: number;

  @IsInt()
  @IsOptional()
  page?: number; // halaman

  @IsInt()
  @IsOptional()
  limit?: number; // jumlah data per halaman
}
