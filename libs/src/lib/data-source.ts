import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
    username: process.env['POSTGRES_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    synchronize: true,
    logging: false,
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'], 
});