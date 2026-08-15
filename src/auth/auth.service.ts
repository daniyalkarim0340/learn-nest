import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    register(registerUserDto: registerDto) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.createuser();
    }
}
