import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstMigration1704485393902 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query()
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query() // reverts things made in "up" method
  }
}
