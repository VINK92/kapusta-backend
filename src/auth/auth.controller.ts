import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { string } from 'joi';
import { AuthService } from 'src/auth/auth.service';
import { TokenType } from 'src/auth/types';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/schemas/user.schema';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @Post('registration')
  async registration(userDto: CreateUserDto): Promise<User | Error | null> {
    return await this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: string })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('login')
  async login(userDto: CreateUserDto): Promise<TokenType | Error> {
    return await this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('/:id/logout')
  async logout(@Param('id') id: string) {
    return await this.authService.logout(id);
  }
}
