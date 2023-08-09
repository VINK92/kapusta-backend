import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
