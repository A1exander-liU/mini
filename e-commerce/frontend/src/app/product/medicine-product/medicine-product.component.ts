import { Component, Input } from '@angular/core';
import { FullProduct, Medicine } from '../../api/types';

@Component({
  selector: 'app-medicine-product',
  standalone: true,
  imports: [],
  templateUrl: './medicine-product.component.html',
  styleUrl: './medicine-product.component.css',
})
export class MedicineProductComponent {
  @Input('product') product: FullProduct<Medicine> | undefined;
}
