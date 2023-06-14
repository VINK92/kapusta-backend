import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getByID(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async create(body: CreateUserDto): Promise<User | null> {
    return await this.userModel.create(body);
  }

  async update(id: string, body: UpdateUserDto): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
}
