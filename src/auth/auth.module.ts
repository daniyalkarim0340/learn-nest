import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Gives AuthService access to UserRepository
    TypeOrmModule.forFeature([User]),

    // Gives AuthService access to JwtService
    JwtModule.register({}),
  ],

  controllers: [AuthController],

  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}