import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPostDto';
import { PipesExist } from './pipes/pipes.exist';
import { UpdatePostDto } from './dto/updatepostdto';

import {Posts as PostEntity  } from './entites/post_entity';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
 async findAll():Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findone(@Param('id', ParseIntPipe,PipesExist) id: number): Promise<PostEntity> {
    return this.postService.findone(id);
  }

@Post("create")
@HttpCode(HttpStatus.CREATED)
create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
  return this.postService.create(createPostDto);
}

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe,PipesExist ) id: number,
    @Body() updatePostDto:UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }
  
@Delete(':id')

async remove(@Param('id', ParseIntPipe,PipesExist) id: number): Promise<void> {
  return this.postService.remove(id);

}

}