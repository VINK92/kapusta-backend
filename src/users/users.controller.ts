import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: Array<User> })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get(':id')
  async getByID(@Param('id') id: string): Promise<User | null> {
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
  async create(@Body() body: CreateUserDto): Promise<User | null> {
    return await this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User | null> {
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
}
