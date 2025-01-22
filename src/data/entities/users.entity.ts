import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
   Relation,
   Unique,
   UpdateDateColumn
} from 'typeorm';
import { PostsEntity } from './posts.entity';

@Entity({ name: 'users' })
@Unique(['email', 'googleId'])
export class UsersEntity {
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column()
   name: string;

   @ApiProperty()
   @Column()
   email: string;

   @ApiProperty()
   @Column({ name: 'google_id' })
   googleId: string;

   @ApiPropertyOptional()
   @Column({ nullable: true, name: 'image_url' })
   imageURL: string;

   @ApiPropertyOptional({ type: () => PostsEntity })
   @OneToMany(() => PostsEntity, ({ user }) => user)
   posts: Relation<PostsEntity[]>;

   @ApiPropertyOptional()
   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   @ApiPropertyOptional()
   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @ApiProperty()
   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;
}
