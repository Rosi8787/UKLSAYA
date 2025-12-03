import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Password salah');

    const token = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      status: true,
      message: 'Login berhasil',
      data:{
        token,
        role: user.role,
        user,
      }
    };
  }

  async register(dto: RegisterDto) {
    // cek email sudah dipakai?
    const exist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exist) {
      throw new BadRequestException('Email sudah digunakan');
    }

    // hash password
    const hashed = await bcrypt.hash(dto.password, 10);

    // simpan user baru
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role,
      },
    });

    return {
      status: true,
      message: 'Registrasi berhasil',
      data:{
        user
      }
      // user: {
      //   email: user.email,
      //   role: user.role,
      // },
    };
  }catch(error){
    return{
      status:false,
      message:`Registrasi gagal ${error}`,
      data:null
    }
  }
}
