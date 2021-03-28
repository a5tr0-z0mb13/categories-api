import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  public findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  public createOrUpdate(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }

  public delete(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id).then((category: Category) => this.categoriesRepository.remove(category));
  }
}
