import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() body: any) {
    return this.newsService.create(body);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.newsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
