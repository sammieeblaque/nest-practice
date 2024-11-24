import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config as dotenvConfig } from 'dotenv';

import 'reflect-metadata';

dotenvConfig();

const database = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  retryAttempts: 2,
  retryDelay: 3000,
  ssl: true,
  autoLoadEntities: true,
  logging: true,
  keepConnectionAlive: true,
  synchronize: true,
} satisfies TypeOrmModuleOptions;

export default registerAs('database', () => database);

export const connectionSource = new DataSource(database as DataSourceOptions);
