import { MigrationInterface, QueryRunner } from 'typeorm'
import functionalitys from "../seed/functionalitys.json"


export class FirstMigration1704485393902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      functionalitys.map(async (channel) => {
        return queryRunner.query(`
          INSERT INTO functionality (id, name)
          VALUES ('${channel.id}', '${channel.name}')
        `);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let ids = "";
    functionalitys.forEach((channel, index) => {
      ids += index > 0 ? `, '${channel.id}'` : `'${channel.id}'`;
    });

    await queryRunner.query(`
      DELETE FROM functionality
      WHERE id IN (${ids})
    `);
  }
}
