import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.metadata';
import { OneProductDto } from './dtos/oneProduct.dto';

@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private readonly product: ProductService) {}

  @Public()
  @Get()
  async allProducts() {
    const products = await this.product.allProducts();
    return { statusCode: 200, message: 'Got all products', products };
  }

  @Public()
  @Get(':productId')
  async oneProduct(@Param() params: OneProductDto) {
    const product = await this.product.oneProduct(parseInt(params.productId));
    return { statusCode: 200, message: 'Got product', product };
  }
}
