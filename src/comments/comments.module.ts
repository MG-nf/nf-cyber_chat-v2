import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller.js';
import { CommentsService } from './comments.service.js';
import { Comment } from './comment.entity.js';
import { Thread } from '../threads/thread.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Thread])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
