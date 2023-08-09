import { hash } from 'bcrypt';
import { IsEmail } from 'class-validator';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsEmail()
  @Column({ type: 'text' })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, default: '', nullable: true })
  token: string;

  @Column({ default: 0 })
  balance: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 16);
  }
  @OneToMany(() => TransactionEntity, (transaction) => transaction.user, {
    eager: true,
  })
  transactions: TransactionEntity[];
}
