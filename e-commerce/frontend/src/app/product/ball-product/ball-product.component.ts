import { Component, Input } from '@angular/core';
import { Ball, FullProduct } from '../../api/types';
import { Location, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ball-product',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './ball-product.component.html',
  styleUrl: './ball-product.component.css',
})
export class BallProductComponent {
  @Input('product') product: FullProduct<Ball> | undefined;

  constructor(private readonly location: Location) {}

  goBack() {
    this.location.back();
  }
}
