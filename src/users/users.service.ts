import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/data/entities';
import { IGoogleUser, IJwtPayload } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(UsersEntity)
      private readonly usersRepository: Repository<UsersEntity>
   ) {}

   async createUser(input: { user: IGoogleUser }) {
      const { user } = input;
      await this.usersRepository.upsert({ ...user }, { conflictPaths: ['email', 'googleId'] });
      return this.usersRepository.findOneBy({ email: user.email, googleId: user.googleId });
   }

   getMe(input: { user: IJwtPayload }) {
      const {
         user: { email, sub, id }
      } = input;
      return this.usersRepository.findOneBy({ email, googleId: sub, id });
   }
}
