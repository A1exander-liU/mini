import { Component, Input } from '@angular/core';
import { Collectible } from '../../api/types';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collectible-product',
  standalone: true,
  imports: [TitleCasePipe, CurrencyPipe, ReplacePipe, RouterLink],
  templateUrl: './collectible-product.component.html',
  styleUrl: './collectible-product.component.css',
})
export class CollectibleProductComponent {
  @Input() details: Collectible | undefined;
}
