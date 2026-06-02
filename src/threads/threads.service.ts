import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>,
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const newThread = this.threadsRepository.create(createThreadDto);
    return await this.threadsRepository.save(newThread);
  }

  async findAll(): Promise<Thread[]> {
    return await this.threadsRepository.find();
  }

  async findOne(id: string): Promise<Thread> {
    const thread = await this.threadsRepository.findOne({ where: { id } });
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found`);
    }
    return thread;
  }

  async update(id: string, updateThreadDto: UpdateThreadDto): Promise<Thread> {
    const thread = await this.findOne(id);

    Object.assign(thread, updateThreadDto);

    return await this.threadsRepository.save(thread);
  }
}
