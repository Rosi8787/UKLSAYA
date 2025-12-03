import { IsOptional, IsString, IsInt } from "class-validator";

export class CreateAnalisiDto {
  @IsString()
  @IsOptional() 
  tahun_ajaran?: string; // contoh: "2025/2026"

  @IsInt()
  @IsOptional()
  semester?: number; // contoh: 1 atau 2

  @IsInt()
  @IsOptional()
  limit?: number; // optional, default 10
}