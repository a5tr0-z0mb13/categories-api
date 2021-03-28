import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesGateway } from './categories.gateway';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoriesGateway,
    CategoriesService
  ]
})
export class CategoriesModule {}
