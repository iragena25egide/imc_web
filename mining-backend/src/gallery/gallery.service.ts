import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  create(data: any) {
    const item = this.galleryRepository.create(data);
    return this.galleryRepository.save(item);
  }

  findAll() {
    return this.galleryRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, data: any) {
    await this.galleryRepository.update(id, data);
    return this.galleryRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.galleryRepository.delete(id);
    return { success: true };
  }
}
