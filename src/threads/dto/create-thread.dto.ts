import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The title of the thread',
    example: 'Hello, world!',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  title!: string;

  @ApiProperty({
    description: 'The actual content of the thread',
    example: 'Lorem ispum dolor sit amet etc',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10000)
  body!: string;

  @IsUUID('4')
  @IsNotEmpty()
  authorId!: string;
}
