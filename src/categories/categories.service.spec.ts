import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepository: Repository<Category>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          // @todo: is there a better way of providing a repository test double?
          useValue: {
            find: () => {},
            findOne: (id: number) => {},
            save: (category: Category) => {},
            remove: (category: Category) => {}
          }
        }
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the Repository\'s find funciton', async () => {
      const categories: Category[] = [
        { id: 1, parentId: null, label: 'Parent' } as Category,
        { id: 2, parentId: 1, label: 'ChildOne' } as Category,
        { id: 3, parentId: 1, label: 'ChildTwo' } as Category,
        { id: 4, parentId: 1, label: 'ChildThree' } as Category
      ];

      jest.spyOn(categoriesRepository, 'find').mockImplementation(() => categories);

      expect(await categoriesService.findAll()).toBe(categories);
    });
  });

  describe('createOrUpdate', () => {
    it('should call the Repository\'s save function', async () => {
      const category: Category = { parentId: 1, label: 'ChildFour' } as Category;

      jest.spyOn(categoriesRepository, 'save').mockImplementation(() => category);

      expect(await categoriesService.createOrUpdate(category)).toBe(category);
    });
  });

  describe('delete', () => {
    it('should call the Repository\'s delete funciton', async () => {
      const category: Category = { id: 4, parentId: 1, label: 'ChildThree' } as Category;

      jest.spyOn(categoriesRepository, 'findOne').mockImplementation(() => Promise.resolve(category));
      jest.spyOn(categoriesRepository, 'remove').mockImplementation(() => category);

      expect(await categoriesService.delete(4)).toBe(category);
    });
  });
});
