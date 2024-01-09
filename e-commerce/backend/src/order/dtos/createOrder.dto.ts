import { Type } from 'class-transformer';
import {
  IsArray,
  IsCurrency,
  IsNumber,
  IsOptional,
  IsPositive,
  IsPostalCode,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  country: string;

  @IsPostalCode('any')
  @IsOptional()
  postalCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @IsCurrency()
  subtotal: string;

  @IsCurrency()
  tax: string;

  @IsCurrency()
  total: string;
}

export class CreateOrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
