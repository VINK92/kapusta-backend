import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import ormdatasource from 'src/ormdatasource';
import { CreateTransactionDto } from 'src/transactions/dto/createTransaction.dto';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { TransactionService } from 'src/transactions/transaction.service';
import { TransactionResponse } from 'src/transactions/types/transaction-response.interface';
import { User } from 'src/users/decorators/user.decorator';
import { CollectionResponse } from 'src/users/types/collection-response.interface';
import { UserEntity } from 'src/users/user.entity';
import { DeleteResult, getRepository } from 'typeorm';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createTransaction(
    @User() user: UserEntity,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponse> {
    return this.transactionService.createTransaction(
      user,
      createTransactionDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllTransaction(
    @User() user: UserEntity,
    @Query() query: any,
  ): Promise<CollectionResponse<TransactionEntity>> {
    return await this.transactionService.getAllTransaction(user, query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTransactionById(
    @User() user: UserEntity,
    @Param('id') transactionId: number,
  ): Promise<TransactionResponse | null> {
    return await this.transactionService.getTransactionById(
      transactionId,
      user,
    );
  }

  @Delete(':id/delete')
  @UseGuards(AuthGuard)
  async deleteTransaction(
    @Param('id') transactionId: number,
  ): Promise<DeleteResult> {
    return await this.transactionService.deleteTransaction(transactionId);
  }
}
