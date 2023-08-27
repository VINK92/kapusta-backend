import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from 'src/transactions/transaction.controller';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { TransactionService } from 'src/transactions/transaction.service';
import { UserEntity } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, UserEntity])],
  controllers: [TransactionController],
  providers: [TransactionService, UserService],
})
export class TransactionModule {}
