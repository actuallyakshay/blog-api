import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity, UsersEntity } from 'src/data/entities';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
   imports: [TypeOrmModule.forFeature([PostsEntity, UsersEntity])],
   providers: [PostsService, JwtService, AuthService, UsersService],
   controllers: [PostsController]
})
export class PostsModule {}
