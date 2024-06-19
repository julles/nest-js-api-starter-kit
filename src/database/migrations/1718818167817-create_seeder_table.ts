import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSeederTable1718818167817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'seeder',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'seeder_name',
            type: 'varchar',
            length: '200',
            isUnique: true,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('seeder');
  }
}
