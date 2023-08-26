import {
  TransactionCategory,
  TransactionType,
} from 'src/transactions/transaction.entity';
import { Pagination } from 'src/types/pagination.interface';

export interface TransactionsQuery extends Pagination {
  transactionType?: TransactionType;
  category?: TransactionCategory;
}
