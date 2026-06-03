import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/is-admin.guard';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: 'Gets the comment with the given id.',
  })
  @ApiOkResponse({ description: 'Comment retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Comment not found.' })
  @Get(':id')
  getCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Deletes the comment with the given id. ADMIN-ONLY!',
  })
  @ApiNoContentResponse({ description: 'Comment deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'Comment not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  deleteComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.delete(id);
  }
}
