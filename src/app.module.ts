import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { validateConfig } from './config.validator';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }), UsersModule, PostsModule, DataModule, AuthModule],
   controllers: [AppController],
   providers: [AppService]
})
export class AppModule {}
