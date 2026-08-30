import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  authorname?: string;
}