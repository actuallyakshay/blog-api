import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as entities from './entities';

@Global()
@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule.forRoot()],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => {
            return {
               type: 'postgres',
               host: configService.getOrThrow('DB_HOST'),
               port: configService.getOrThrow<number>('DB_PORT'),
               username: configService.getOrThrow('DB_USERNAME'),
               password: configService.getOrThrow('DB_PASSWORD'),
               database: configService.getOrThrow('DB_DATABASE'),
               entities: entities,
               migrations: [join(process.cwd(), 'dist/data/migrations/*.js')],
               migrationsRun: true,
               synchronize: false,
               logging: false,
               uuidExtension: 'pgcrypto'
            };
         }
      })
   ]
})
export class DataModule {}
