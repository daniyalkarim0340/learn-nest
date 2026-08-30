import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';


@Module({
   imports: [
      TypeOrmModule.forFeature([User])
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
