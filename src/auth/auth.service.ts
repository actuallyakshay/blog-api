import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/data/entities';
import { IGoogleUser, IJwtPayload } from 'src/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
   ) {}

   async login(input: { user: IGoogleUser }): Promise<{ token: string }> {
      const { user } = input;
      const foundUser = await this.usersService.createUser({ user });
      const payload: IJwtPayload = { email: foundUser.email, sub: foundUser.googleId, id: foundUser.id };
      return { token: await this.jwtService.signAsync(payload) };
   }

   validateUser(input: { user: IJwtPayload }): Promise<UsersEntity> {
      const { user } = input;
      return this.usersService.getMe({ user });
   }
}
