import { Component, Input } from '@angular/core';
import { Ball, FullProduct } from '../../api/types';

@Component({
  selector: 'app-ball-product',
  standalone: true,
  imports: [],
  templateUrl: './ball-product.component.html',
  styleUrl: './ball-product.component.css',
})
export class BallProductComponent {
  @Input('product') product: FullProduct<Ball> | undefined;
}
