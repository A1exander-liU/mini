import { Component, Input } from '@angular/core';
import { FullProduct, Medicine } from '../../api/types';
import { Location, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicine-product',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './medicine-product.component.html',
  styleUrl: './medicine-product.component.css',
})
export class MedicineProductComponent {
  @Input('product') product: FullProduct<Medicine> | undefined;

  constructor(private readonly location: Location) {}

  goBack() {
    this.location.back();
  }
}
