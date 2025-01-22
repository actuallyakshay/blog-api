import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   Relation,
   Unique,
   UpdateDateColumn
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'posts' })
@Unique(['title', 'user'])
export class PostsEntity {
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column()
   title: string;

   @ApiProperty()
   @Column()
   content: string;

   @ManyToOne(() => UsersEntity, ({ posts }) => posts, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'user_id' })
   @Index()
   user: Relation<UsersEntity>;

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
