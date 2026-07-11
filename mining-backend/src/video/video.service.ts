import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  create(data: any) {
    const item = this.videoRepository.create(data);
    return this.videoRepository.save(item);
  }

  findAll() {
    return this.videoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, data: any) {
    await this.videoRepository.update(id, data);
    return this.videoRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.videoRepository.delete(id);
    return { success: true };
  }
}
