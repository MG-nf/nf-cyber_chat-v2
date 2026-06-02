import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Thread } from './threads/thread.entity';
import { Comment } from './comments/comment.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './data/cyberchat.sqlite',
  entities: [Thread, Comment, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
