import { Component, Input } from '@angular/core';
import { Product } from '../api/types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: Product | undefined;
}
