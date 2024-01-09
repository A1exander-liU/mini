import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem, Product } from '../../api/types';
import { ApiService } from '../../api/api.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import Decimal from 'decimal.js';

export type CartItemUpdateEvent = {
  type: 'inc' | 'dec' | 'remove';
  productid: number;
  price: string;
};

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnChanges {
  @Output() cartItemUpdated = new EventEmitter<CartItemUpdateEvent>();

  @Input() cartItem: CartItem | undefined;
  product: Product | undefined;

  constructor(private readonly api: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItem']) {
      const currentCartItem = changes['cartItem'].currentValue as CartItem;
      this.getProductDetails(currentCartItem.productid);
    }
  }

  getProductDetails(id: number) {
    this.api.oneProduct(id).then((res) => {
      this.product = res.product;
    });
  }

  decrementQuantity() {
    this.cartItem!.quantity--;
    this.cartItemUpdated.emit({
      type: 'dec',
      productid: this.cartItem!.productid,
      price: this.getCartItemPrice(),
    });
  }

  incrementQuantity() {
    this.cartItem!.quantity++;
    this.cartItemUpdated.emit({
      type: 'inc',
      productid: this.cartItem!.productid,
      price: this.getCartItemPrice(),
    });
  }

  removeCartItem() {
    this.cartItemUpdated.emit({
      type: 'remove',
      productid: this.cartItem!.productid,
      price: this.getCartItemPrice(),
    });
  }

  getCartItemPrice() {
    if (!this.product || !this.cartItem) {
      return '';
    }
    const price = new Decimal(this.product!.price);
    const quantity = new Decimal(this.cartItem!.quantity);
    return price.mul(quantity).toDecimalPlaces(2).toString();
  }
}
