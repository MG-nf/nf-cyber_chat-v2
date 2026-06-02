import { Expose, Type } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';

export class ResponseCommentDto {
  @Expose()
  id!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Expose()
  author!: { id: string; name: string };
}
