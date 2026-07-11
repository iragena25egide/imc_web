import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() body: any) {
    return this.videoService.create(body);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.videoService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
