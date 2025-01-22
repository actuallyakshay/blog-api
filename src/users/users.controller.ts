import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWTAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/types';
import { UsersEntity } from 'src/data/entities';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JWTAuthGuard)
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Get('/me')
   @ApiResponse({ status: 200, type: UsersEntity })
   getMe(@CurrentUser() user: IJwtPayload) {
      return this.usersService.getMe({ user });
   }
}
