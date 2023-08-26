import { UserEntity } from 'src/users/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionCategory {
  transport = 'transport',
  products = 'products',
  health = 'health',
  alcohol = 'alcohol',
  entertainment = 'entertainment',
  housing = 'housing',
  technique = 'technique',
  communal = 'communal',
  sports = 'sports',
  education = 'education',
  other = 'other',
  salary = 'salary',
  addIncome = 'addIncome'
}

export enum TransactionType {
  withdrawal = 'withdrawal',
  deposit = 'deposit',
}

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType, enumName: 'TransactionType' })
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TransactionCategory,
    enumName: 'TransactionCategory',
  })
  category: string;

  @Column()
  sum: number;

  // @Column()
  // sign: string;

  @BeforeUpdate()
  updatedTimestamp() {
    this.updatedAt = new Date();
  }
  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;
}
