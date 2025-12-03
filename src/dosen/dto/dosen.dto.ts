import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { gender } from "@prisma/client";

export class DosenDto {
  @IsString()
  nidn: string;

  @IsString()
  nama: string;

  @IsString()
  @IsEnum(gender)
  jenis_kelamin: gender

  @IsString()
  @IsNotEmpty()
  alamat: string
}
