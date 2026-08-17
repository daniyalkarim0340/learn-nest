import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/userschemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
   async createuser(registerUserDto: registerDto) {
     return  await this.userModel.create({
        name: registerUserDto.name,
        email: registerUserDto.email,
        password: registerUserDto.password
      })
      
       
    }
}
