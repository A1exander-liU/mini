import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BasicOrder, MeRes } from '../api/types';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: MeRes | undefined;
  orders: BasicOrder[] = [];
  totalItems: number[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.me().then((res) => {
      this.profile = { ...res };
    });

    this.api.getOrders().then((res) => {
      this.orders = [...res.orders];
      this.getQuantities();
    });
  }

  async getQuantities() {
    for (let i = 0; i < this.orders.length; i++) {
      const res = await this.api.getOneOrder(this.orders[i].id);
      let quantity = 0;
      for (let j = 0; j < res.order.order_items.length; j++) {
        quantity += res.order.order_items[j].quantity;
      }
      this.totalItems.push(quantity);
    }
  }
}
