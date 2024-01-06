import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: number, productId: number) {
    try {
      const cartItem = await this.prisma.shopping_carts.upsert({
        create: { userid: userId, productid: productId, quantity: 1 },
        update: { quantity: { increment: 1 } },
        where: { userid_productid: { userid: userId, productid: productId } },
      });
      this.logger.log(cartItem);
      return { statusCode: 200, message: 'Added item to cart' };
    } catch (err) {
      if (err.code === 'P2003') {
        throw new BadRequestException(
          `Product with id: ${productId} does not exist`,
        );
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteFromCart(userId: number, productId: number) {
    try {
      const cartItem = await this.prisma.shopping_carts.delete({
        where: { userid_productid: { userid: userId, productid: productId } },
      });
      this.logger.log(cartItem);
      return {
        statusCode: 200,
        message: 'Deleted item from cart',
      };
    } catch (err) {
      this.logger.log(err.code);
      if (err.code === 'P2025') {
        throw new BadRequestException("Product is not in user's shopping cart");
      }
    }
  }

  async updateCartItemAmount(
    userId: number,
    productId: number,
    operation: 'inc' | 'dec',
  ) {
    try {
      const cartItem = await this.prisma.shopping_carts.update({
        where: { userid_productid: { userid: userId, productid: productId } },
        data: {
          quantity: { [operation === 'inc' ? 'increment' : 'decrement']: 1 },
        },
      });
      this.logger.log(cartItem);
      if (cartItem.quantity == 0) {
        await this.deleteFromCart(userId, productId);
        return { statusCode: 200, message: 'Deleted item from cart' };
      }
      return { stausCode: 200, message: 'Updated cart item quantity' };
    } catch (err) {
      if (err.code === 'P2003') {
        throw new BadRequestException(
          `Product with id: ${productId} does not exist`,
        );
      } else if (err.code === 'P2025') {
        throw new BadRequestException("Product is not in user's cart");
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  async getCartItems(userId: number) {
    const cartItems = await this.prisma.shopping_carts.findMany({
      where: { userid: userId },
    });
    return {
      statusCode: 200,
      message: `${cartItems.length} items found in cart`,
      cart: cartItems,
    };
  }
}
