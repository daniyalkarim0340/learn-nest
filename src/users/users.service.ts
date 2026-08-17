import { Injectable } from '@nestjs/common';
import { registerDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UsersService {
    constructor() {}
    createuser(registerUserDto: registerDto) {
        return { message: "User registered successfully" };
    }
}
