import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
   @ApiProperty({
      description: 'Title of the post',
      example: 'My first post'
   })
   @IsString()
   @IsNotEmpty()
   title: string;

   @ApiProperty({
      description: 'Content of the post',
      example: 'This is my first post. Welcome to my blog!'
   })
   @IsNotEmpty()
   @IsString()
   content: string;
}
