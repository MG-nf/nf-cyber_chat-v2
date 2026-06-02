import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity.js';
import { Thread } from '../threads/thread.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { plainToInstance } from 'class-transformer';
import { ResponseCommentDto } from './dto/response-comment.dto.js';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>,
  ) {}

  async create(threadId: string, dto: CreateCommentDto): Promise<Comment> {
    const thread = await this.threadsRepository.findOne({
      where: { id: threadId },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${threadId}" not found`);
    }

    const comment = this.commentsRepository.create({
      body: dto.body,
      author: { id: dto.author },
      thread: thread,
    });

    return await this.commentsRepository.save(comment);
  }

  async findOne(id: string): Promise<ResponseCommentDto> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return plainToInstance(ResponseCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string) {
    return await this.commentsRepository.update(
      { id: id },
      { body: 'deleted' },
    );
  }
}
