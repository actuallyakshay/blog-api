import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards';
import { CurrentUser } from './decorators/current-user.decorator';
import { IGoogleUser } from 'src/types';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('/login')
   @UseGuards(GoogleAuthGuard)
   async login(@CurrentUser() user: IGoogleUser) {
      return this.authService.login({ user });
   }
}
