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

export type CartItemUpdateEvent = {
  type: 'inc' | 'dec' | 'remove';
  userid: number;
  productid: number;
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
    this.cartItemUpdated.emit({
      type: 'dec',
      userid: this.cartItem!.userid,
      productid: this.cartItem!.productid,
    });
  }

  incrementQuantity() {
    this.cartItemUpdated.emit({
      type: 'inc',
      userid: this.cartItem!.userid,
      productid: this.cartItem!.productid,
    });
  }

  removeCartItem() {
    this.cartItemUpdated.emit({
      type: 'remove',
      userid: this.cartItem!.userid,
      productid: this.cartItem!.productid,
    });
  }
}
