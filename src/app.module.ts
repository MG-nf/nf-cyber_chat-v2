import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { Thread } from './threads/thread.entity';
import { Comment } from './comments/comment.entity';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This is the magic flag
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/cyberchat.sqlite',
      entities: [Thread, Comment, User],
      synchronize: false,
      logging: true,
    }),
    ThreadsModule,
    CommentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
