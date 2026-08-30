import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';

import { PostService } from '../post.service';

@Injectable()
export class PipesExist implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const post = this.postService.findone(value);

    if (!post) {
      throw new NotFoundException(`Post with id ${value} not found`);
    }

    return value;
  }
}