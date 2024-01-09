import { Component, Input } from '@angular/core';
import { BasicOrder } from '../../api/types';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  @Input() order: BasicOrder | undefined;
  @Input() totalitems: number | undefined;
}
