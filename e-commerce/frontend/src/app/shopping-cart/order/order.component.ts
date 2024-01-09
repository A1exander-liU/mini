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

    console.log(addressErrors);
    console.log(cityErrors);
    console.log(countryErrors);
    console.log(postalCodeErrors);
  }

  handleOrder() {
    this.showErrorMessages();

    if (this.orderForm.status === 'VALID') {
    }
  }
}
