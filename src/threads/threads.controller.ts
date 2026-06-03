import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './thread.entity';
import { ApiParam } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { CommentsService } from 'src/comments/comments.service';
import { ResponseThreadDto } from './dto/response-thread.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  findAll(): Promise<ResponseThreadDto[]> {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseThreadDto> {
    return this.threadsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ): Promise<Thread> {
    return this.threadsService.update(id, updateThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  @ApiParam({
    name: 'id',
    description: 'The ID of the thread you want to comment on',
    example: '12',
    type: Number,
  })
  async createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(id, createCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async deleteThread(@Param('id') id: string) {
    return this.threadsService.delete(id);
  }
}
