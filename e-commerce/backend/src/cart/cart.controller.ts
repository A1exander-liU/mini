import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { AddToCartDto } from './dtos/addToCart.dto';
import { User } from 'src/user/user.decorator';
import { users } from '@prisma/client';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dtos/updateCartItem.dto';

@Controller({
  path: 'cart',
  version: '1',
})
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cart: CartService) {}

  @Put(':productId')
  addToCart(@Param() params: AddToCartDto, @User() user: users) {
    return this.cart.addToCart(user.id, parseInt(params.productId));
  }

  @Patch(':productId')
  updateCartItem(
    @Param() params: AddToCartDto,
    @Query() query: UpdateCartItemDto,
    @User() user: users,
  ) {
    return this.cart.updateCartItemAmount(
      user.id,
      parseInt(params.productId),
      query.operation,
    );
  }

  @Delete(':productId')
  deleteFromCart(@Param() params: AddToCartDto, @User() user: users) {
    return this.cart.deleteFromCart(user.id, parseInt(params.productId));
  }

  @Get()
  getCartItems(@User() user: users) {
    return this.cart.getCartItems(user.id);
  }
}
