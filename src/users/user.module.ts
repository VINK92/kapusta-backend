import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { UserController } from 'src/users/user.controller';
// import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserEntity],
  exports: [
    UserService,
    //UserEntity
  ],
})
export class UserModule {}
