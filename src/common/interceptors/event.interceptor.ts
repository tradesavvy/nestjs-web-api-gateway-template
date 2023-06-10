// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   Logger,
//   NestInterceptor,
// } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { Observable, tap } from 'rxjs';

// @Injectable()
// export class EventInterceptor implements NestInterceptor {
//   private readonly logger = new Logger(EventInterceptor.name);

//   constructor(private readonly emitter: EventEmitter2) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     this.logger.log('EventInterceptor...');
//     const request = context.switchToHttp().getRequest();
//     const response = context.switchToHttp().getResponse();
//     const path = request.path;
//     this.logger.log('Intercepting...login..Response: ' + response.body);

//     if (path === '/login') {
//       this.logger.log('Intercepting...login..request: ' + request);
//     } else if (path === '/register') {
//       this.logger.log('Intercepting...register..request');
//     }

//     return next.handle().pipe(
//       tap(() => {
//         this.logger.log('EventInterceptor...path: ' + path);
//         if (path === '/login') {
//           this.logger.log('Intercepting...login..Response: ');
//           // this.emitter.emit('user.login', new UserLoginEvent());
//         } else if (path === '/register') {
//           this.logger.log('Intercepting...register..Response');
//           // this.emitter.emit('user.register', new UserCreatedEvent());
//         }
//       }),
//     );
//   }
// }
