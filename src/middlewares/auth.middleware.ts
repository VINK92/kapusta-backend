// import { JWT_SECRET } from '@app/config';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { IExpressRequest } from 'src/types/express-request.interface';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const { id } = this.jwtService.decode(token) as any;

      if (!id) {
        next();
        return;
      }
      const user = await this.userService.getByID(id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
      return;
    }
  }
}
