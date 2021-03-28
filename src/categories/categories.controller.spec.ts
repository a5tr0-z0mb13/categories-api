import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

describe('Categories Controller', () => {
  let module: TestingModule;

  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {}
        }
      ]
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the CategoriesService\'s find funciton', async () => {
      const categories: Category[] = [
        { id: 1, parentId: null, label: 'Parent' } as Category,
        { id: 2, parentId: 1, label: 'ChildOne' } as Category,
        { id: 3, parentId: 1, label: 'ChildTwo' } as Category,
        { id: 4, parentId: 1, label: 'ChildThree' } as Category
      ];

      jest.spyOn(categoriesService, 'findAll').mockImplementation(() => categories);

      expect(await categoriesController.findAll()).toBe(categories);
    });
  });

  describe('create', () => {
    it('should call the CategoriesService\'s createOrUpdate function', async () => {
      const category: Category = { parentId: 1, label: 'ChildFour' } as Category;

      jest.spyOn(categoriesService, 'createOrUpdate').mockImplementation(() => category);

      expect(await categoriesController.create(category)).toBe(category);
    });
  });

  describe('create', () => {
    it('should call the CategoriesService\'s createOrUpdate function', async () => {
      const category: Category = { id: 5, parentId: 1, label: 'ChildFour' } as Category;

      jest.spyOn(categoriesService, 'createOrUpdate').mockImplementation(() => category);

      expect(await categoriesController.update(category)).toBe(category);
    });
  });

  describe('delete', () => {
    it('should call the CategoriesService\'s delete funciton', async () => {
      const category: Category = { id: 4, parentId: 1, label: 'ChildThree' } as Category;

      jest.spyOn(categoriesService, 'delete').mockImplementation(() => category);

      expect(await categoriesController.delete(4)).toBe(category);
    });
  });
});
