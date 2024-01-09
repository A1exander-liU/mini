import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CartItem } from '../api/types';
import {
  CartItemComponent,
  CartItemUpdateEvent,
} from './cart-item/cart-item.component';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  prices: { [productid: string]: string } = {};

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.api.getCartItems().then((res) => {
      this.cartItems = res.cart;
      this.prices = {};
      for (let i = 0; i < this.cartItems.length; i++) {
        this.api.oneProduct(this.cartItems[i].productid).then((res): void => {
          const price = new Decimal(res.product.price);
          const quantity = new Decimal(this.cartItems[i].quantity);

          this.prices[this.cartItems[i].productid] = price
            .mul(quantity)
            .toDecimalPlaces(2)
            .toString();
        });
      }
    });
  }

  incrementCartItem(productId: number, price: string) {
    this.prices[productId] = price;
    return this.api.updateCartItem(productId, 'inc');
  }

  decrementCartItem(productId: number, price: string) {
    this.prices[productId] = price;
    return this.api.updateCartItem(productId, 'dec');
  }

  removeCartItem(productId: number) {
    return this.api.removeFromCart(productId);
  }

  async handleEvents(event: CartItemUpdateEvent) {
    switch (event.type) {
      case 'inc': {
        await this.incrementCartItem(event.productid, event.price);
        break;
      }
      case 'dec': {
        await this.decrementCartItem(event.productid, event.price);
        break;
      }
      case 'remove': {
        await this.removeCartItem(event.productid);
        this.getCartItems();
        break;
      }
    }
  }
}
