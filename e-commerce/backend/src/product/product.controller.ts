import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.metadata';

@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly product: ProductService) {}

  @Public()
  @Get('all')
  async allProducts() {
    const products = await this.product.allProducts();
    return { statusCode: 200, message: 'Got all products', products };
  }
}
