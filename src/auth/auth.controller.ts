import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TokenType } from 'src/auth/types';
import { User } from 'src/users/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserEntity } from 'src/users/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: UserEntity })
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
  async registration(
    @Body()
    userDto: CreateUserDto,
  ): Promise<UserEntity | Error | null> {
    return await this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: string })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<TokenType | Error> {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('/:id/logout')
  async logout(@Param('id') id: number) {
    return await this.authService.logout(id);
  }

  @Get('current')
  @UseGuards(AuthGuard)
  async getCurrentUser(@User('id') id: number): Promise<UserEntity | null> {
    return await this.authService.getCurrentUser(id);
  }
}
