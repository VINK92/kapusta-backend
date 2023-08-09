import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserService } from 'src/users/user.service';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from 'src/users/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BalanceResponseInterface } from 'src/users/types/balance-responce.interface';
import { User } from 'src/users/decorators/user.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: Array<UserEntity> })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<UserEntity | null> {
    return await this.usersService.getByID(id);
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('create')
  @UsePipes(new ValidationPipe())
  //   @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateUserDto): Promise<UserEntity | null> {
    return await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Patch(':id/update')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity | null> {
    return await this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Delete(':id/delete')
  @UsePipes()
  async delete(@Param('id') id: string): Promise<any> {
    return await this.usersService.delete(id);
  }

  @Post('user/balance')
  @UseGuards(AuthGuard)
  async updateBalance(
    @User() user: UserEntity,
    @Body('balance') newBalance: number,
  ): Promise<BalanceResponseInterface> {
    return this.usersService.updateBalance(user, newBalance);
  }
}
