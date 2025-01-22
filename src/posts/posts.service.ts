import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from 'src/data/entities';
import { IJwtPayload } from 'src/types';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsService {
   constructor(
      @InjectRepository(PostsEntity)
      private readonly postsRepository: Repository<PostsEntity>
   ) {}

   getMyPosts(input: { user: IJwtPayload }) {
      const {
         user: { id }
      } = input;
      return this.postsRepository
         .createQueryBuilder('posts')
         .leftJoin('posts.user', 'user')
         .where('user.id = :id', { id })
         .orderBy('posts.createdAt', 'DESC')
         .getMany();

      // we can do this as well
      //   return this.postsRepository.find({
      //      where: { user: { id } },
      //      order: { createdAt: 'DESC' }
      //   });
   }

   getAllPosts() {
      return this.postsRepository.find({
         order: { createdAt: 'DESC' }
      });
   }

   // this method is used for both updating and creating coz m using upsert method here
   async createOrUpdatePost(input: { body: CreatePostDto; user: IJwtPayload }): Promise<PostsEntity> {
      const {
         body,
         user: { id }
      } = input;

      const result = await this.postsRepository.upsert({ ...body, user: { id } }, ['title', 'user.id']);
      return this.postsRepository.findOneBy({ id: result.identifiers?.[0]?.id });
   }
}
