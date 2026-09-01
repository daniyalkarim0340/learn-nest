
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
    // Inject the User repository so we can
    // communicate with the User table in PostgreSQL.
    @InjectRepository(User)
    private userRepository: Repository<User>,

    // JwtService is used to create and verify JWT tokens.
    private jwtService: JwtService,
  ) {}

  // =========================================================
  // REGISTER USER
  // =========================================================

  async register(registerDto: RegisterUserDto) {
    // Get user data from the DTO
    const { name, email, password } = registerDto;

    // Check if a user with this email already exists
    const emailExist = await this.userRepository.findOne({
      where: { email },
    });

    // If email already exists, stop registration
    if (emailExist) {
      throw new ConflictException('Email already exists');
    }

    // Hash the user's password before saving it
    // 10 = salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User entity
    const user = this.userRepository.create({
      name,
      email,

      // Never save the plain password in the database
      password: hashedPassword,

      // New users get USER role by default
      role: UserRole.USER,
    });

    // Save user into PostgreSQL
    await this.userRepository.save(user);

    // Return a safe response
    // Do NOT return the password.
    return {
      message: 'User registered successfully',

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password:user.password,
      },
    };
  }

  // =========================================================
  // LOGIN USER
  // =========================================================

  async login(loginDto: LoginUserDto) {
    // Find the user using their email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    // If user doesn't exist
    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    // Compare the password sent by the user
    // with the hashed password stored in database.
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // If password is incorrect
    if (!passwordMatch) {
      throw new ConflictException('Invalid email or password');
    }

    // Generate access token + refresh token
    const tokens = await this.generateTokens(user);

    // Return tokens to the client
    return {
      message: 'Login successful',
      ...tokens,
    };
  }

  // =========================================================
  // GENERATE ACCESS TOKEN + REFRESH TOKEN
  // =========================================================

  private async generateTokens(user: User) {
    // Data that will be stored inside the JWT payload
    const payload = {
      sub: user.id,       // User ID
      email: user.email, // User email
      role: user.role,   // User role
    };

    // ---------------------------------------------------------
    // ACCESS TOKEN
    // ---------------------------------------------------------
    // Access token is short-lived.
    // Here it expires after 15 minutes.
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    // ---------------------------------------------------------
    // REFRESH TOKEN
    // ---------------------------------------------------------
    // Refresh token lives longer.
    // Here it expires after 7 days.
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // =========================================================
  // GENERATE ONLY A NEW ACCESS TOKEN
  // =========================================================

  private async accessToken(user: User) {
    // Create payload again using the current user's data
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate a new access token
    // using the ACCESS secret.
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  // =========================================================
  // REFRESH ACCESS TOKEN
  // =========================================================

  async Refreshtoken(refreshToken: string) {
    try {
      // -------------------------------------------------------
      // STEP 1:
      // Verify the refresh token.
      //
      // IMPORTANT:
      // We use JWT_REFRESH_SECRET here, NOT
      // JWT_ACCESS_SECRET.
      // -------------------------------------------------------

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // -------------------------------------------------------
      // STEP 2:
      // Get the user ID from the JWT payload.
      //
      // When we created the token:
      //
      // sub: user.id
      //
      // Therefore:
      // payload.sub = user.id
      // -------------------------------------------------------

      const user = await this.userRepository.findOne({
        where: {
          id: payload.sub,
        },
      });

      // -------------------------------------------------------
      // STEP 3:
      // Make sure the user still exists.
      // -------------------------------------------------------

      if (!user) {
        throw new ConflictException('Invalid refresh token');
      }

      // -------------------------------------------------------
      // STEP 4:
      // Generate a NEW access token.
      //
      // We don't generate another refresh token here.
      // -------------------------------------------------------

      const accessToken = await this.accessToken(user);

      // -------------------------------------------------------
      // STEP 5:
      // Send the new access token back to the client.
      // -------------------------------------------------------

      return {
        accessToken,
      };
    } catch (error) {
      // If the refresh token is:
      // - expired
      // - invalid
      // - signed with the wrong secret
      // - malformed
      //
      // verifyAsync() will throw an error.
      throw new ConflictException('Invalid refresh token');
    }
  }
}

