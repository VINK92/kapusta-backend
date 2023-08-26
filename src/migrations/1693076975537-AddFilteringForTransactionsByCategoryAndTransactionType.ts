import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFilteringForTransactionsByCategoryAndTransactionType1693076975537 implements MigrationInterface {
    name = 'AddFilteringForTransactionsByCategoryAndTransactionType1693076975537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."TransactionCategory" RENAME TO "TransactionCategory_old"`);
        await queryRunner.query(`CREATE TYPE "public"."TransactionCategory" AS ENUM('transport', 'products', 'health', 'alcohol', 'entertainment', 'housing', 'technique', 'communal', 'sports', 'education', 'other', 'salary', 'addIncome')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "category" TYPE "public"."TransactionCategory" USING "category"::"text"::"public"."TransactionCategory"`);
        await queryRunner.query(`DROP TYPE "public"."TransactionCategory_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."TransactionCategory_old" AS ENUM('products')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "category" TYPE "public"."TransactionCategory_old" USING "category"::"text"::"public"."TransactionCategory_old"`);
        await queryRunner.query(`DROP TYPE "public"."TransactionCategory"`);
        await queryRunner.query(`ALTER TYPE "public"."TransactionCategory_old" RENAME TO "TransactionCategory"`);
    }

}
