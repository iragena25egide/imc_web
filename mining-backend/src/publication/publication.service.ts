import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  create(data: any) {
    const item = this.publicationRepository.create(data);
    return this.publicationRepository.save(item);
  }

  findAll() {
    return this.publicationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, data: any) {
    await this.publicationRepository.update(id, data);
    return this.publicationRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.publicationRepository.delete(id);
    return { success: true };
  }
}
