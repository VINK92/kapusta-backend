import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertyIsBalanceInitiated1692984883154 implements MigrationInterface {
    name = 'AddPropertyIsBalanceInitiated1692984883154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isBalanceInitiated" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBalanceInitiated"`);
    }

}
