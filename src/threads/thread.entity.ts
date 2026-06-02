import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[];

  @Column({ type: 'varchar' })
  authorId!: string;

  @ManyToOne(() => User, (user: User) => user.threads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author!: User;
}
