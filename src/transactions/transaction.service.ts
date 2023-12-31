import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import ormdatasource from 'src/ormdatasource';
import { CreateTransactionDto } from 'src/transactions/dto/createTransaction.dto';
import {
  TransactionEntity,
  TransactionType,
} from 'src/transactions/transaction.entity';
import { TransactionResponse } from 'src/transactions/types/transaction-response.interface';
import { TransactionsQuery } from 'src/transactions/types/transactions-query.interface';
import { CollectionResponse } from 'src/users/types/collection-response.interface';
import { UserEntity } from 'src/users/user.entity';
import { buildCollectionResponse } from 'src/utils/build-collection-response';
import { Repository, DeleteResult, DataSource } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}
  async createTransaction(
    user: UserEntity,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponse> {
    const transaction = new TransactionEntity();
    Object.assign(transaction, createTransactionDto);

    if (!transaction.type) {
      transaction.type = '';
    }

    if (transaction.type === TransactionType.deposit) {
      user.balance = Number(user.balance) + Number(transaction.sum);
      await this.userRepository.save(user);
    }

    if (transaction.type === TransactionType.withdrawal) {
      user.balance = user.balance - transaction.sum;
      await this.userRepository.save(user);
    }

    transaction.user = user;
    return await this.transactionRepository.save(transaction);
  }

  async getAllTransaction(
    user: UserEntity,
    query: TransactionsQuery,
  ): Promise<CollectionResponse<TransactionEntity>> {
    const { page, pageSize, transactionType, category, month, year } = query;
    const queryBuilder = this.dataSource
      .getRepository(TransactionEntity)
      .createQueryBuilder('transactions')
      .where('transactions.user.id = :id', { id: user.id })
      .leftJoinAndSelect('transactions.user', 'user')
      .orderBy('transactions.createdAt', 'DESC');

    if (page && pageSize) {
      queryBuilder.take(pageSize).skip(page * pageSize - pageSize);
    }

    if (transactionType) {
      queryBuilder.where('transactions.type = :type', {
        type: transactionType,
      });
    }
    if (category) {
      queryBuilder.where('transactions.category = :category', {
        category,
      });
    }

    if (month && year) {
      queryBuilder
        .where(`EXTRACT(YEAR FROM transactions.createdAt) = :year`, { year })
        .andWhere(`EXTRACT(MONTH FROM transactions.createdAt) = :month`, {
          month,
        });
    }

    const transactionsData = await queryBuilder.getManyAndCount();
    const itemsCount = await queryBuilder.getCount();

    return buildCollectionResponse<TransactionResponse>(
      transactionsData[0],
      itemsCount,
      page,
    );

    // return await this.transactionRepository.find({
    //   relationLoadStrategy: 'query',
    //   relations: {
    //     user: false,
    //   },
    //   where: { user: { id: user.id } },
    // });
  }

  async getTransactionById(
    transactionId: number,
    user: UserEntity,
  ): Promise<TransactionResponse | null> {
    return await this.transactionRepository.findOne({
      where: { user: { id: user.id }, id: transactionId },
    });
  }

  async deleteTransaction(transactionId: number): Promise<DeleteResult> {
    return await this.transactionRepository.delete({ id: transactionId });
  }
}
