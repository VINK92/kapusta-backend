import { UsePipes } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    required: true,
    example: '63e0bb4e96302c350b39b74b',
  })
  @Prop({ type: Object })
  id: string;

  @ApiProperty({
    required: true,
    example: 'nazaruk.v92@gmail.com',
  })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({
    required: true,
    enum: [],
    enumName: 'ENUM',
    example: 'Viktoriia',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    required: true,
    example: '1234567890',
  })
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty({
    required: true,
    example: 'qwertyuiopasdfghjkl1234567890zxcvbnmqwertyuiop',
  })
  @Prop({ type: String, default: '', required: false })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
