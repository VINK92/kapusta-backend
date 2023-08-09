import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import ormdatasource from 'src/ormdatasource';
import { CreateTransactionDto } from 'src/transactions/dto/createTransaction.dto';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { TransactionResponse } from 'src/transactions/types/transaction-response.interface';
import { CollectionResponse } from 'src/users/types/collection-response.interface';
import { UserEntity } from 'src/users/user.entity';
import { buildCollectionResponse } from 'src/utils/build-collection-response';
import { Repository, DeleteResult, DataSource } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
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
    transaction.user = user;

    return await this.transactionRepository.save(transaction);
  }

  async getAllTransaction(
    user: UserEntity,
    query: any,
  ): Promise<CollectionResponse<TransactionEntity>> {
    const { limit, offset } = query;
    const queryBuilder = this.dataSource
      .getRepository(TransactionEntity)
      .createQueryBuilder('transactions')
      .where('transactions.user.id = :id', { id: user.id })
      .leftJoinAndSelect('transactions.user', 'user')
      .orderBy('transactions.createdAt', 'DESC')
      .take(limit)
      .skip(offset);
    //   .skip(skip);

    const transactionsData = await queryBuilder.getManyAndCount();
    const itemsCount = await queryBuilder.getCount();
    // const pageCount = await queryBuilder.;

    return buildCollectionResponse<TransactionResponse>(
      transactionsData[0],
      itemsCount,
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
