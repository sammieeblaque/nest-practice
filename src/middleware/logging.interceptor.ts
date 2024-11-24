import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly productsService: ProductsService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    this.productsService.create({
      name: 'Product 1',
      price: 10,
      description: 'product',
    });

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
