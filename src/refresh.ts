import { config } from 'dotenv';
import { datasourceManual } from './database/database';
config();
async function dropAllTables() {
  const dataSource = datasourceManual;

  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.startTransaction();
  try {
    const tables = await queryRunner.query(`
      SELECT tablename FROM pg_catalog.pg_tables
      WHERE schemaname = 'public';
    `);

    for (const table of tables) {
      const tableName = table.tablename;
      await queryRunner.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE;`);
    }

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
    await dataSource.destroy();
  }
}

dropAllTables()
  .then(() => {
    console.log('All tables dropped');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error dropping tables:', error);
    process.exit(1);
  });
