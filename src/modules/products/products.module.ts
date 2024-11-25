import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from '../../repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductsRepository])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
