import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IJwtPayload } from 'src/types';
import { JWTAuthGuard } from 'src/auth/guards';
import { CreatePostDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { PostsEntity } from 'src/data/entities';

@Controller('posts')
export class PostsController {
   constructor(private readonly postsService: PostsService) {}

   @Get()
   @ApiResponse({ status: 200, type: PostsEntity, isArray: true })
   getAllPosts() {
      return this.postsService.getAllPosts();
   }

   @UseGuards(JWTAuthGuard)
   @Get('/me')
   @ApiResponse({ status: 200, type: PostsEntity, isArray: true })
   getMyPosts(@CurrentUser() user: IJwtPayload) {
      return this.postsService.getMyPosts({ user });
   }

   @UseGuards(JWTAuthGuard)
   @Post('/create')
   @ApiResponse({ status: 200, type: PostsEntity })
   createOrUpdatePost(@CurrentUser() user: IJwtPayload, @Body() body: CreatePostDto) {
      return this.postsService.createOrUpdatePost({ user, body });
   }

   @Get('/:id')
   @ApiResponse({ status: 200, type: PostsEntity })
   getPostById(@Param('id') id: string) {
      return this.postsService.getPostById({ id });
   }

   @Delete('/:id')
   @ApiResponse({ status: 200, type: String })
   deletePost(@Param('id') id: string) {
      return this.postsService.deletePost({ id });
   }
}
