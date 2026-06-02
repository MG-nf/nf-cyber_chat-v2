import { Exclude, Expose, Type } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';
import { ResponseCommentDto } from 'src/comments/dto/response-comment.dto';

export class ResponseThreadDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Exclude()
  authorId!: string;

  @Expose()
  comments!: ResponseCommentDto[];

  @Expose()
  author!: {
    name: string;
  };
}
