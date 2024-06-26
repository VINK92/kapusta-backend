import { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

export interface IExpressRequest extends Request {
  user: UserEntity | undefined;
}
