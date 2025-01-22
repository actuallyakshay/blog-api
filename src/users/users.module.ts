import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/data/entities';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
   imports: [TypeOrmModule.forFeature([UsersEntity])],
   controllers: [UsersController],
   providers: [UsersService, JwtService, AuthService]
})
export class UsersModule {}
