import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOCIAL-TEMPLATE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_TRANSPORT_URL || ''],
          queue:
            process.env.RMQ_SOCIAL_TEMPLATE_QUEUE_NAME ||
            'laabhum_social_template_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [PostService, CommentService],
  controllers: [PostController, CommentController],
})
export class SocialTemplateModule {}
