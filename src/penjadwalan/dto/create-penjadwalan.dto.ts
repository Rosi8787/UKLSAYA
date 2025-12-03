
import { IsNotEmpty, IsString, IsInt } from "class-validator";

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
}
