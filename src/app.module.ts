import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';

config();
const uri = process.env.DB_URI as string;

@Module({
  imports: [
    MongooseModule.forRoot(uri, { useUnifiedTopology: true }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
