import { UserEntity } from 'src/users/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionCategory {
  products = 'products',
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
