import { IsNumberString } from 'class-validator';

export class AddToCartDto {
  @IsNumberString()
  productId: string;
}
