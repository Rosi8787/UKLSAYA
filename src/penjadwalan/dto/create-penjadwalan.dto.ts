import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class CreatePenjadwalanDto {
  @IsString()
  @IsNotEmpty()
  hari: string;

  @IsString()
  @IsNotEmpty()
  jam_mulai: string;

  @IsString()
  @IsNotEmpty()
  jam_selesai: string;

  @IsString()
  @IsNotEmpty()
  ruang: string;

  @IsString()
  @IsNotEmpty()
  dosenNidn: string;

  @IsInt()
  matakuliahId: number;

  @IsInt()
  @IsNotEmpty()
  semester: number;

  @IsString()
  @IsNotEmpty()
  tahunAjaran: string;
}
