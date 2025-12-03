import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class PilihMatakuliahDto {
  @IsInt()
  mahasiswa_id: number;

  @IsArray()
  @IsInt({ each: true })
  matakuliah_ids: number[];
}
 