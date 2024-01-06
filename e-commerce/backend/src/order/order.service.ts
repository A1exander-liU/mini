import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private readonly prisma: PrismaService) {}

  async allOrders(userId: number) {
    const orders = await this.prisma.orders.findMany({
      where: { userid: userId },
    });
    return { statusCode: 200, message: 'Got orders', orders };
  }

  async oneOrder(userId: number, orderId: number) {
    try {
      const order = await this.prisma.orders.findFirst({
        where: { id: orderId, userid: userId },
        include: {
          order_items: {
            select: {
              id: true,
              orderid: false,
              productid: true,
              quantity: true,
            },
            include: {
              products: {
                select: {
                  id: false,
                  name: true,
                  description: true,
                  imageurl: true,
                  category: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      return { statusCode: 200, message: 'Got order', order };
    } catch (err) {
      this.logger.log(err.code);
      throw new BadRequestException(err.message);
    }
  }
}
