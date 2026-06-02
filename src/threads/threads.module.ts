import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsController } from './threads.controller.js';
import { ThreadsService } from './threads.service.js';
import { Thread } from './thread.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
