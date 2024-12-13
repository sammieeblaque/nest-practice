import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'products',
})
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('create-many')
  createManyProducts(@Body() data: Partial<CreateProductDto>[]) {
    return this.productsService.createManyProducts(data);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
