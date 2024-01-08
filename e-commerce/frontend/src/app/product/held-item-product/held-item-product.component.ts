import { Component, Input } from '@angular/core';
import { FullProduct, HeldItem } from '../../api/types';
import { Location, TitleCasePipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-held-item-product',
  standalone: true,
  imports: [TitleCasePipe, ReplacePipe, RouterLink],
  templateUrl: './held-item-product.component.html',
  styleUrl: './held-item-product.component.css',
})
export class HeldItemProductComponent {
  @Input('product') product: FullProduct<HeldItem> | undefined;

  constructor(private readonly location: Location) {}

  goBack() {
    this.location.back();
  }
}
