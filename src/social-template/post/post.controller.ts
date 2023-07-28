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
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';
import { lastValueFrom } from 'rxjs';

@Controller('social/post')
export class PostController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(PostController.name);
  constructor(private postService: PostService) {
    super();
  }

  @Post()
  async createPost(
    @Res() res: Response,
    @Request() req,
    @Body() post: CreatePostDto,
  ) {
    post.username = req.user.username;
    const result$ = this.postService.createPost(post);
    const result = await lastValueFrom(await result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Put('/:postId')
  async updatePost(
    @Res() res: Response,
    @Request() req,
    @Body() post: UpdatePostDto,
    @Param('postId') postId: string,
  ) {
    post.postId = postId;
    post.username = req.user.username;
    const result$ = this.postService.updatePost(post);
    const result = await lastValueFrom(await result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('like/:postId')
  async likePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    const result$ = await this.postService.likePost(postId, req.user.username);
    const result = await lastValueFrom(await result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post('/unlike/:postId')
  async unlikePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    const result$ = await this.postService.unlikePost(
      postId,
      req.user.username,
    );
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Get('/:postId')
  async getPost(@Res() res: Response, @Param('postId') postId: string) {
    try {
      const newPost = await this.postService.getPost(postId);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Delete('/:postId')
  async deletePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    try {
      const newPost = await this.postService.deletePost(postId, req.user.id);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Post('comment/:postId')
  async addComment(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDto,
  ) {
    try {
      const newComment = await this.postService.addComment(
        req.user.id,
        postId,
        comment,
      );
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Delete('comment/:commentId')
  async deleteComment(
    @Res() res: Response,
    @Request() req,
    @Param('commentId') commentId: string,
  ) {
    try {
      const deletedComment = await this.postService.deleteComment(
        commentId,
        req.user.id,
      );
      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
