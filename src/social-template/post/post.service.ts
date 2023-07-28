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

  likePost(postId: string, username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'likePost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, {
      postId,
      username,
    });
  }

  unlikePost(postId: string, username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'unLikePost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, {
      postId,
      username,
    });
  }

  deletePost(postId: string, username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'deletePost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, {
      postId,
      username,
    });
  }

  getPost(postId: string): Observable<ResponseDto> {
    const pattern = { cmd: 'getPost' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, {
      postId,
    });
  }
}
