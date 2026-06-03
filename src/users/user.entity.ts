import { Thread } from '../threads/thread.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  username!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({
    type: 'varchar',
    default: 'user',
  })
  role!: string;

  @OneToMany(() => Thread, (thread: Thread) => thread.author)
  threads!: Thread[];

  @OneToMany(() => Comment, (comment: Comment) => comment.author)
  comments!: Comment[];
}
