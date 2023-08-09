import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBalanceToUserEntity1690736694215 implements MigrationInterface {
    name = 'AddBalanceToUserEntity1690736694215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "balance" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
    }

}
