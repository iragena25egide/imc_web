import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GalleryModule } from './gallery/gallery.module';
import { NewsModule } from './news/news.module';
import { PublicationModule } from './publication/publication.module';
import { Gallery } from './gallery/entities/gallery.entity';
import { News } from './news/entities/news.entity';
import { Publication } from './publication/entities/publication.entity';
import { VideoModule } from './video/video.module';
import { Video } from './video/entities/video.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:DHWvJFcGarruMmpDaGShCTGwZFCumDCJ@tokaido.proxy.rlwy.net:44376/railway',
      entities: [Gallery, News, Publication, Video],
      synchronize: true, // Auto-create tables (good for dev)
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    GalleryModule,
    NewsModule,
    PublicationModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
