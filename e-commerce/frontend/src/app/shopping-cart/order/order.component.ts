import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export type OrderEvent = {
  address: string;
  city: string;
  region?: string | null | undefined;
  country: string;
  postalCode?: string | null | undefined;
};

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  @Output() orderPlaced = new EventEmitter<OrderEvent>();

  orderForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    region: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [
      Validators.pattern(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/i),
    ]),
  });

  addressError = '';
  cityError = '';
  countryError = '';
  postalCodeError = '';

  showErrorMessages() {
    const addressErrors = this.orderForm.get('address')?.errors;
    const cityErrors = this.orderForm.get('city')?.errors;
    const countryErrors = this.orderForm.get('country')?.errors;
    const postalCodeErrors = this.orderForm.get('postalCode')?.errors;

    if (addressErrors && addressErrors['required']) {
      this.addressError = 'This field is required';
    }

    if (cityErrors && cityErrors['required']) {
      this.cityError = 'This field is required';
    }

    if (countryErrors && countryErrors['required']) {
      this.countryError = 'This field is required';
    }

    if (postalCodeErrors && postalCodeErrors['pattern']) {
      this.postalCodeError = 'Not a valid postal code';
    }
  }

  handleOrder() {
    this.showErrorMessages();

    if (this.orderForm.status === 'VALID') {
      this.orderPlaced.emit({
        address: this.orderForm.value.address!,
        city: this.orderForm.value.city!,
        region: this.orderForm.value.region,
        country: this.orderForm.value.country!,
        postalCode: this.orderForm.value.postalCode,
      });
    }
  }
}
