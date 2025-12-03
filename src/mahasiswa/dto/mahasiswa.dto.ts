import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Prisma } from "@prisma/client";
// import { Type } from "class-transformer";
import { gender } from "@prisma/client";

export class MahasiswaDto {
  @IsString()
  @IsNotEmpty()
  nim: string;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  jenis_kelamin: gender;

  @IsString()
  @IsNotEmpty()
  jurusan: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
