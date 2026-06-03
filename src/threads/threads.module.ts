import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsController } from './threads.controller.js';
import { ThreadsService } from './threads.service.js';
import { Thread } from './thread.entity.js';
import { CommentsService } from '../comments/comments.service.js';
import { Comment } from '../comments/comment.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread]),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService, CommentsService],
})
export class ThreadsModule {}
