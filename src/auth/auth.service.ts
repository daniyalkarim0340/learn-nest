import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async register(registerUserDto: registerDto) {
        
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
       const user= await this.usersService.createuser({password: hashedPassword, ...registerUserDto});
    }
}
