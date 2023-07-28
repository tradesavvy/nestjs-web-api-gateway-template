import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject('SOCIAL-TEMPLATE')
    private readonly socialTemplateClient: ClientProxy,
  ) {}

  addComment(comment: CreateCommentDto): Observable<ResponseDto> {
    const pattern = { cmd: 'addComment' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, comment);
  }

  deleteComment(commentId: string, username: string): Observable<ResponseDto> {
    const pattern = { cmd: 'deleteComment' };
    return this.socialTemplateClient.send<ResponseDto>(pattern, {
      commentId,
      username,
    });
  }
}
