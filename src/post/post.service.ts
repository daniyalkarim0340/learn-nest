import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/post.intergace';
import { CreatePostDto } from './dto/createPostDto';
import { UpdatePostDto } from './dto/updatepostdto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entites/post_entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postRepository.find();
  } 

async findone(id: number): Promise<Posts> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
        throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
}

   async create(CreatePostDto: CreatePostDto): Promise<Posts> {
    const newPost = this.postRepository.create({
        title: CreatePostDto.title,
        content: CreatePostDto.content,
        authorname: CreatePostDto.authorname,
    });
    return this.postRepository.save(newPost);
  }




async update(
  id: number,
  updatePostDto: UpdatePostDto,
): Promise<Posts> {
  const post = await this.postRepository.findOneBy({ id });

  if (!post) {
    throw new NotFoundException(`Post with id ${id} not found`);
  }

  Object.assign(post, updatePostDto);

  return this.postRepository.save(post);
}


async remove(id: number): Promise<void> {
  const post = await this.postRepository.findOneBy({ id });
  if (!post) {
    throw new NotFoundException(`Post with id ${id} not found`);
  }

   await this.postRepository.remove(post);



}


}


