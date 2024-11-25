import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Products } from '../modules/products/entities/product.entity';

@Injectable()
export class ProductsRepository extends Repository<Products> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {
    super(Products, dataSource.manager);
  }

  async findName(name: string): Promise<Products | null> {
    return this.findOne({ where: { name } });
  }

  async findAll(): Promise<Products[]> {
    return this.find();
  }

  async createProducts(data: Partial<Products>): Promise<Products> {
    const user = this.create(data);
    return this.save(user);
  }

  async softDeleteUser(id: number): Promise<void> {
    await this.softDelete(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.entityManager.delete(Products, id);
  }

  async createManyProducts(data: Partial<Products>[]) {
    const products = this.entityManager.transaction(async (entityManager) => {
      return await Promise.all(
        data.map(async (user) => {
          return await entityManager.save(Products, user);
        }),
      );
    });
    return products;
  }

  async findActiveUsers(): Promise<Products[]> {
    return this.createQueryBuilder('products')
      .where('user.deletedAt IS NULL')
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }
}
