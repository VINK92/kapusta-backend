import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  readonly sum: number;

  readonly type?: string;
  readonly userId?: number;
}
