import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './thread.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creates a new thread.' })
  @ApiCreatedResponse({
    description: 'The thread has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'The input data is invalid.' })
  @ApiUnauthorizedResponse({ description: 'User is not logged in.' })
  @Post()
  create(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {
    return this.threadsService.create(createThreadDto);
  }

  @ApiOperation({ summary: 'Lists all threads.' })
  @ApiOkResponse({ description: 'All threads retrieved successfully.' })
  @Get()
  findAll(): Promise<ResponseThreadDto[]> {
    return this.threadsService.findAll();
  }

  @ApiOperation({ summary: 'Returns a single thread.' })
  @ApiOkResponse({ description: 'Thread retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Thread not found.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseThreadDto> {
    return this.threadsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a thread.' })
  @ApiOkResponse({ description: 'Thread updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'Thread not found.' })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ): Promise<Thread> {
    return this.threadsService.update(id, updateThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Creates a new comment for the thread with the given id.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Comment created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid comment data.' })
  @ApiNotFoundResponse({ description: 'Thread not found.' })
  @Post(':id/comment')
  @ApiParam({
    name: 'id',
    description: 'The ID of the thread you want to comment on',
    example: '12',
    type: Number,
  })
  async createComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(id, createCommentDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Thread deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'Thread not found.' })
  @ApiOperation({
    summary: 'Deletes the thread with the given id. ADMIN-ONLY!',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @ApiBearerAuth()
  async deleteThread(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.delete(id);
  }
}
