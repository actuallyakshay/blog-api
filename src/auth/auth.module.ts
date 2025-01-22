import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/data/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
   imports: [
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }
         }),
         inject: [ConfigService]
      }),
      TypeOrmModule.forFeature([UsersEntity])
   ],
   providers: [AuthService, UsersService],
   controllers: [AuthController]
})
export class AuthModule {}
