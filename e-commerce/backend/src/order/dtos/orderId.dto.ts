import { IsNumberString } from 'class-validator';

export class OrderIdDto {
  @IsNumberString()
  orderId: string;
}
