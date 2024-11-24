import { Products } from './entities/product.entity';

export interface IProductsRepository {
  findAll(): Promise<Products[]>;
  findById(id: number): Promise<Products>;
  create(Products: Partial<Products>): Promise<Products>;
  update(id: number, Products: Partial<Products>): Promise<Products>;
  delete(id: number): Promise<void>;
}
