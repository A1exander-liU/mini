import { Component, Input } from '@angular/core';
import { FullProduct, HeldItem } from '../../api/types';

@Component({
  selector: 'app-held-item-product',
  standalone: true,
  imports: [],
  templateUrl: './held-item-product.component.html',
  styleUrl: './held-item-product.component.css',
})
export class HeldItemProductComponent {
  @Input('product') product: FullProduct<HeldItem> | undefined;
}
