import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnumsNames1690733519387 implements MigrationInterface {
    name = 'UpdateEnumsNames1690733519387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum" RENAME TO "transactions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."TransactionType" AS ENUM('withdrawal', 'deposit')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."TransactionType" USING "type"::"text"::"public"."TransactionType"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_category_enum" RENAME TO "transactions_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."TransactionCategory" AS ENUM('products')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "category" TYPE "public"."TransactionCategory" USING "category"::"text"::"public"."TransactionCategory"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_category_enum_old" AS ENUM('products')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "category" TYPE "public"."transactions_category_enum_old" USING "category"::"text"::"public"."transactions_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."TransactionCategory"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_category_enum_old" RENAME TO "transactions_category_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum_old" AS ENUM('withdrawal', 'deposit')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transactions_type_enum_old" USING "type"::"text"::"public"."transactions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."TransactionType"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum_old" RENAME TO "transactions_type_enum"`);
    }

}
