import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CartItem } from '../api/types';
import {
  CartItemComponent,
  CartItemUpdateEvent,
} from './cart-item/cart-item.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.api.getCartItems().then((res) => {
      this.cartItems = res.cart;
    });
  }

  handleEvents(event: CartItemUpdateEvent) {
    console.log(event);
  }
}
