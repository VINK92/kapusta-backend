import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from 'src/transactions/transaction.controller';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { TransactionService } from 'src/transactions/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
