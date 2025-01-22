import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
   type: 'postgres',
   host: process.env.DB_HOST,
   port: parseInt(String(process.env.DB_PORT)),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: ['src/data/entities/*.ts'],
   migrations: ['src/data/migrations/*.ts'],
   migrationsTableName: 'migrations',
   synchronize: false,
   logging: false
};

export default new DataSource(dataSourceOptions);
