import { CreateUserDto } from 'src/users/dto/createUser.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {}
