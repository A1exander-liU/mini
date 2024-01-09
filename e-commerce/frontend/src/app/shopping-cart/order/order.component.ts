import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orderForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    region: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [
      Validators.pattern(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/),
    ]),
  });

  showErrorMessages() {}

  handleOrder() {
    this.showErrorMessages();

    if (this.orderForm.status === 'VALID') {
    }
  }
}
