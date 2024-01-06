import { IsIn, IsString } from 'class-validator';

export class UpdateCartItemDto {
  @IsString()
  @IsIn(['inc', 'dec'])
  operation: 'inc' | 'dec';
}
