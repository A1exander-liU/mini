import { IsNumberString } from 'class-validator';

export class OneProductDto {
  @IsNumberString({})
  productId: string;
}
