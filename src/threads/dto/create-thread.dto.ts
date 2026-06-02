/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10000)
  body!: string;

  @IsUUID('4')
  @IsNotEmpty()
  authorId!: string;
}
