import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  getCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  deleteComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.delete(id);
  }
}
