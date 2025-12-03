import { IsNotEmpty, IsNumber, IsString, IsInt } from "class-validator";

export class MatakuliahDto {
  @IsInt()
  @IsNotEmpty()
  id_matakuliah: number;

  @IsString()
  @IsNotEmpty()
  nama_matakuliah: string;

  @IsInt()
  @IsNotEmpty()
  id_dosen: string;

  @IsInt()
  @IsNotEmpty()
  sks: number;

}