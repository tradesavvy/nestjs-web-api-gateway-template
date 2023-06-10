import {
  NestMiddleware,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class GlobalErrorHandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    process.on('unhandledRejection', (reason, promise) => {
      throw new HttpException(
        'Unhandled Rejection at: ' + promise + ' reason: ' + reason,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    next();
  }
}
