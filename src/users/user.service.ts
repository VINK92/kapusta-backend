import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UserEntity } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceResponseInterface } from 'src/users/types/balance-responce.interface';
import { CollectionResponse } from 'src/users/types/collection-response.interface';

@Injectable()
export class UserService {
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getByID(id: number): Promise<any> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, userDto);
    return await this.userRepository.save(newUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    Object.assign(user!, updateUserDto);
    return await this.userRepository.save(user!);
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async getOneUser(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateBalance(
    user: UserEntity,
    newBalance: number,
  ): Promise<BalanceResponseInterface> {
    user.balance = newBalance;
    await this.userRepository.save(user);
    return { balance: newBalance };
  }

  buildCollectionResponse<T>(items: Array<T>): CollectionResponse<T> {
    return {
      data: items,
      meta: {
        pageCount: items.length / 10,
        resourceCount: items.length,
      },
    };
  }
}
