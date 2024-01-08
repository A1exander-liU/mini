import { Component, Input } from '@angular/core';
import { Collectible, FullProduct } from '../../api/types';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';

@Component({
  selector: 'app-collectible-product',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe, ReplacePipe],
  templateUrl: './collectible-product.component.html',
  styleUrl: './collectible-product.component.css',
})
export class CollectibleProductComponent {
  @Input('product') product: FullProduct<Collectible> | undefined;
}
