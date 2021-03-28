import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Post()
  public async create(@Body() category: Category): Promise<Category> {
    return await this.categoriesService.createOrUpdate(category);
  }

  @Patch()
  public async update(@Body() category: Category): Promise<Category> {
    return await this.categoriesService.createOrUpdate(category);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.delete(id);
  }
}
