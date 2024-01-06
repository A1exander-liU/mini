import { product_category } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class AllProductsDto {
  @IsOptional()
  @IsEnum(product_category)
  category?: product_category;
}
