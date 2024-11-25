import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { ProductsRepository } from '../../repositories/products.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository = jest.mocked(ProductsRepository);

  const mockProductsRepository = {
    findAll: jest.fn(),
    createProducts: jest.fn(),
    softDeleteUser: jest.fn(),
    deleteUser: jest.fn(),
    findActiveUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Products),
          useValue: {},
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Product 2',
        price: 12,
        description: 'Description 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockProductsRepository.findAll.mockResolvedValue(mockProducts);

    const result = await service.findAll();

    console.log(result);

    expect(result).toEqual(mockProducts);
    expect(mockProductsRepository.findAll).toHaveBeenCalled();
  });
});
