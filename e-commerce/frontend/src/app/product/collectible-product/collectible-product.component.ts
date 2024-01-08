import { Component, Input } from '@angular/core';
import { Collectible, FullProduct } from '../../api/types';

@Component({
  selector: 'app-collectible-product',
  standalone: true,
  imports: [],
  templateUrl: './collectible-product.component.html',
  styleUrl: './collectible-product.component.css',
})
export class CollectibleProductComponent {
  @Input('product') product: FullProduct<Collectible> | undefined;
}
