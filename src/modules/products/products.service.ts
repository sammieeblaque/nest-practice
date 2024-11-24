import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../middleware/products.repository';
import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async create(data: CreateProductDto): Promise<Products> {
    return this.productsRepository.createProducts(data);
  }

  async createManyProducts(data: Partial<Products>[]) {
    return this.productsRepository.createManyProducts(data);
  }
}
