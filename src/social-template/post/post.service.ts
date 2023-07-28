import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('SOCIAL-TEMPLATE')
    private readonly socialTemplateClient: ClientProxy,
  ) {}

  createPost(post: CreatePostDto): Observable<ResponseDto> {
    const pattern = { cmd: 'createPost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, post);
  }

  updatePost(post: UpdatePostDto): Observable<ResponseDto> {
    const pattern = { cmd: 'updatePost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, post);
  }

  async likePost(postId: string, username: string) {
    const pattern = { cmd: 'likePost' };
    return this.socialTemplateClient.send<any>(pattern, {
      postId,
      username,
    });
  }

  async unlikePost(postId: string, username: string) {
    const pattern = { cmd: 'unLikePost' };
    return this.socialTemplateClient.send<any>(pattern, {
      postId,
      username,
    });
  }

  async deletePost(postId: string, userId: string) {
    const pattern = { cmd: 'deletePost' };
    return this.socialTemplateClient.send<any>(pattern, {
      postId,
      userId,
    });
  }

  async addComment(userId: string, postId: string, comment: CreateCommentDto) {
    const pattern = { cmd: 'addComment' };
    return this.socialTemplateClient.send<any>(pattern, {
      postId,
      userId,
      comment,
    });
  }

  async deleteComment(commentId: string, userId: string) {
    const pattern = { cmd: 'deleteComment' };
    return this.socialTemplateClient.send<any>(pattern, {
      commentId,
      userId,
    });
  }

  async getPost(postId: string) {
    const pattern = { cmd: 'getPost' };
    return this.socialTemplateClient.send<any>(pattern, {
      postId,
    });
  }
}
