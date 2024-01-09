import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem, Product } from '../../api/types';
import { ApiService } from '../../api/api.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnChanges {
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
}
