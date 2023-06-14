import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { threadId } from 'worker_threads';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto): Promise<User | Error | null> {
    const isUniqueEmail = await this.userService.getByEmail(userDto.email);
    if (isUniqueEmail) {
      return new Error('Email in use');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 14);
    const user = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(userDto: CreateUserDto): Promise<{ token: string } | Error> {
    const user = await this.userService.getByEmail(userDto.email);
    if (!user) {
      return new Error('Authentication is failed');
    }
    const isPasswordValid = this.validatePassword(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return new Error('Authentication is failed');
    }
    const token = this.generateToken(user.id);

    await this.userService.update(user.id, { token });

    return token;
  }

  private async generateToken(id: string): Promise<{ token: string }> {
    return { token: this.jwtService.sign({ id }) };
  }
  private async validatePassword(
    dtoId: string,
    userId: string,
  ): Promise<Boolean> {
    return await bcrypt.compare(dtoId, userId);
  }

  async logout(id: string) {
    await this.userService.update(id, { token: null });
  }
}
