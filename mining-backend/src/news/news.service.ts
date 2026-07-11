import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  create(data: any) {
    const item = this.newsRepository.create(data);
    return this.newsRepository.save(item);
  }

  findAll() {
    return this.newsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, data: any) {
    await this.newsRepository.update(id, data);
    return this.newsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.newsRepository.delete(id);
    return { success: true };
  }
}
