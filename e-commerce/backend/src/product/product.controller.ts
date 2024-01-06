import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.metadata';
import { OneProductDto } from './dtos/oneProduct.dto';
import { AllProductsDto } from './dtos/allProducts.dto';

@Controller({ path: 'products', version: '1' })
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly product: ProductService) {}

  @Public()
  @Get()
  async allProducts(@Query() query: AllProductsDto) {
    this.logger.log(query);
    const products = await this.product.allProducts(query.category);
    return { statusCode: 200, message: 'Got all products', products };
  }

  @Public()
  @Get(':productId')
  async oneProduct(@Param() params: OneProductDto) {
    const product = await this.product.oneProduct(parseInt(params.productId));
    return { statusCode: 200, message: 'Got product', product };
  }
}
