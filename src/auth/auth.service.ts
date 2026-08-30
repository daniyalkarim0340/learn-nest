import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, UserRole } from './entity/user.entity';
import { RegisterUserDto } from './dto/register_dto';
import { LoginUserDto } from './dto/login_dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    const { name, email, password } = registerDto;

    const emailExist = await this.userRepository.findOne({
      where: { email },
    });

    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new ConflictException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user);

    return {
      message: 'Login successful',
      ...tokens,
    };
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}