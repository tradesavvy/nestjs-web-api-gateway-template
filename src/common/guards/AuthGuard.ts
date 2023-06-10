// import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';

// export class AuthGuard implements CanActivate {
//   private readonly logger = new Logger('AuthGuard');

//   constructor(private readonly authService: AuthService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     this.logger.log('Auth Guard');
//     const req = context.switchToHttp().getRequest();
//     const jwt = req.headers['authorization']?.split(' ')[1];
//     this.logger.log('JWT token: ' + jwt);
//     // return this.authService.validateToken(jwt);
//     return false;
//   }
// }
