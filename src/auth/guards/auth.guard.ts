import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IExpressRequest } from 'src/types/express-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IExpressRequest>();

    if (request.user) {
      return true;
    }
    throw new HttpException('Bad request', HttpStatus.UNAUTHORIZED);
  }
}
