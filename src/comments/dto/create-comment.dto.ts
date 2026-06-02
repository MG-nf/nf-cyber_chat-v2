import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Your comment',
    example: 'Lorem Ispum dolor sit amet etc',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  body!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;
}
