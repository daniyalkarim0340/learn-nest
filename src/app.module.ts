import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post/entites/post_entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
@Module({
  imports: [
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: "postgres",
      password: "givemepassword",
      database: "wrok",
      entities:[Posts,User],
      synchronize: true,
}),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), 
   PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
