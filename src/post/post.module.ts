import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Posts } from './entites/post_entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
