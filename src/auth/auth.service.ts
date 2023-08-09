import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserEntity } from 'src/users/user.entity';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registration(
    userDto: CreateUserDto,
  ): Promise<UserEntity | Error | null> {
    const isUniqueEmail = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (isUniqueEmail) {
      return new HttpException('Email in use', 422);
    }
    const newUser = new UserEntity();
    Object.assign(newUser, userDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginUserDto): Promise<{ token: string } | Error> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: ['id', 'email', 'name', 'password'],
    });
    if (!user) {
      return new HttpException('Authentication is failed', 401);
    }
    const isPasswordValid = this.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return new HttpException('Authentication is failed', 401);
    }
    const token = await this.generateToken(user.id.toString());

    await this.userRepository.update(user.id, token);

    return token;
  }

  async logout(id: number) {
    await this.userRepository.update(id, { token: '' });
  }

  async getCurrentUser(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
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
}
