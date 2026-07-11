import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'imc_publications',
      resource_type: 'image', // Upload PDFs as images to allow in-browser viewing
      format: 'pdf',
    };
  },
});

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.publicationService.update(+id, body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body('title') title: string) {
    return this.publicationService.create({
      fileUrl: file.path, // Cloudinary returns the full URL
      title
    });
  }

  @Get()
  findAll() {
    return this.publicationService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
