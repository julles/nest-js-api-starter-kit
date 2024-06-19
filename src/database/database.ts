import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: `${process.env.DB_TYPE}`,
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  autoLoadEntities: true,
  synchronize: false,
};

const migrationAppends = {
  migrationsRun: false,
  migrations: ['./src/database/migrations/**/*{.ts,.js}'],
};

const configMigrations = { ...config, ...migrationAppends };

export default registerAs('typeormConnection', () => config);
export const datasourceManual = new DataSource(
  configMigrations as DataSourceOptions,
);
