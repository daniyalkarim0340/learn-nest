import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {registerDto} from "./dto/registerUser.dto"

@Controller('auth')
export class AuthController {
  
    constructor(private readonly authService: AuthService) {} 
    @Post()
    register(@Body() registerUserDto:registerDto) {
    const result = this.authService.register(registerUserDto);
    return result;
    }
}
