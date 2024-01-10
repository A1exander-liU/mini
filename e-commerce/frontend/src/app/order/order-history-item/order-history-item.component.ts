import { Component, Input } from '@angular/core';
import { FullOrderItem } from '../../api/types';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-order-history-item',
  standalone: true,
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './order-history-item.component.html',
  styleUrl: './order-history-item.component.css',
})
export class OrderHistoryItemComponent {
  @Input() orderItem: FullOrderItem | undefined;

  totalPrice() {
    return new Decimal(this.orderItem!.price)
      .mul(this.orderItem!.quantity)
      .toDecimalPlaces(2)
      .toString();
  }
}
