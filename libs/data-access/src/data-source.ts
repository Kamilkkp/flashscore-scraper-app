import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] || '5432'),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    synchronize: true,
    logging: false,
  entities: [__dirname+'/entities/*.js'],
  migrations: [__dirname+'/migrations/*.js'], 
});