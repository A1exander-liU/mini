import { Component, Input } from '@angular/core';
import { FullProduct, HeldItem } from '../../api/types';
import { TitleCasePipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';

@Component({
  selector: 'app-held-item-product',
  standalone: true,
  imports: [TitleCasePipe, ReplacePipe],
  templateUrl: './held-item-product.component.html',
  styleUrl: './held-item-product.component.css',
})
export class HeldItemProductComponent {
  @Input('product') product: FullProduct<HeldItem> | undefined;
}
