import { Component, Input } from '@angular/core';
import { BasicOrder } from '../../api/types';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  @Input() order: BasicOrder | undefined;
}
