import { TransactionEntity } from 'src/transactions/transaction.entity';
import { UserEntity } from 'src/users/user.entity';

export interface TransactionResponse extends TransactionEntity {
  user: UserEntity;
}
