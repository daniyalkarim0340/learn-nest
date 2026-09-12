import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register_dto';
import { LoginUserDto } from './dto/login_dto';
import { JwtAuthGuard } from './guards/jwt_auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {

        return this.authService.Refreshtoken(refreshToken);

    }

    @Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req) {
  return req.user;
}

}