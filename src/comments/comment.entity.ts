import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Thread } from '../threads/thread.entity';
import { User } from '../users/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  threadId!: string;

  @Column({ type: 'text' })
  body!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'varchar' })
  authorId!: string;

  @ManyToOne(() => User, (user: User) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  author!: User;

  @ManyToOne(() => Thread, (thread: Thread) => thread.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'threadId' })
  thread!: Thread;
}
