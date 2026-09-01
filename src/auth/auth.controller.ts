import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register_dto';
import { LoginUserDto } from './dto/login_dto';

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
}