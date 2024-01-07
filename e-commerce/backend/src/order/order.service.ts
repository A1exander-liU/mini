import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dtos/createOrder.dto';

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
    const order = await this.prisma.orders.findFirst({
      where: { id: orderId, userid: userId },
      select: {
        id: true,
        createdat: true,
        address: true,
        city: true,
        region: true,
        country: true,
        postal_code: true,
        order_items: {
          select: {
            productid: true,
            quantity: true,
            products: {
              select: {
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

    if (!order) {
      throw new BadRequestException(`Order with id: ${orderId} does not exist`);
    }

    const order_items = order.order_items.map((item) => {
      const product = item.products;
      return {
        productId: item.productid,
        quantity: item.quantity,
        name: product.name,
        description: product.description,
        imageUrl: product.imageurl,
        category: product.category,
        price: product.price,
      };
    });

    return {
      statusCode: 200,
      message: 'Got order',
      order: {
        id: order.id,
        createdat: order.createdat,
        address: order.address,
        city: order.city,
        region: order.region,
        country: order.country,
        postal_code: order.postal_code,
        order_items,
      },
    };
  }

  async createOrder(orderDetails: CreateOrderDto, userId: number) {
    try {
      await this.prisma.orders.create({
        data: {
          userid: userId,
          address: orderDetails.address,
          city: orderDetails.city,
          region: orderDetails.region,
          country: orderDetails.city,
          postal_code: orderDetails.postalCode,
          order_items: {
            create: orderDetails.orderItems.map((item) => {
              return { productid: item.productId, quantity: item.quantity };
            }),
          },
        },
      });
    } catch (err) {
      if (err.code === 'P2003') {
        throw new BadRequestException(
          `Order contains products that don't exist`,
        );
      }
    }
    return { statusCode: 201, message: 'Created new order' };
  }
}
