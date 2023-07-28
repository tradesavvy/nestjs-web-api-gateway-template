import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';
import { lastValueFrom } from 'rxjs';
import { CommentService } from './comment.service';

@Controller('social/comment')
export class CommentController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(CommentController.name);
  constructor(private commentService: CommentService) {
    super();
  }

  @Post(':postId')
  async addComment(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDto,
  ) {
    comment.postId = postId;
    comment.username = req.user.username;
    const result$ = await this.commentService.addComment(comment);
    const result = await lastValueFrom(await result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Delete(':commentId')
  async deleteComment(
    @Res() res: Response,
    @Request() req,
    @Param('commentId') commentId: string,
  ) {
    const result$ = await this.commentService.deleteComment(
      commentId,
      req.user.username,
    );
    const result = await lastValueFrom(await result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }
}
