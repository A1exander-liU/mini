import { Controller, Get, Param } from '@nestjs/common';
import { users } from '@prisma/client';
import { User } from 'src/user/user.decorator';
import { OrderService } from './order.service';
import { OrderIdDto } from './dtos/orderId.dto';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  constructor(private readonly order: OrderService) {}

  @Get()
  allOrders(@User() user: users) {
    return this.order.allOrders(user.id);
  }

  @Get(':orderId')
  oneOrder(@Param() params: OrderIdDto, @User() user: users) {
    return this.order.oneOrder(user.id, parseInt(params.orderId));
  }
}
