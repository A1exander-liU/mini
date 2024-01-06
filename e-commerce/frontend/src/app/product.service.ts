import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = [
    {
      id: 1,
      name: 'White Rice',
      description: 'Description for white rice',
    },
    {
      id: 2,
      name: 'Jasmine Rice',
      description: 'Description for jasmine rice',
    },
    {
      id: 3,
      name: 'Brown Rice',
      description: 'Description for brown rice',
    },
    {
      id: 4,
      name: 'Yellow Rice',
      description: 'Description for yellow rice',
    },
  ];

  constructor() {}

  getProducts() {
    return this.products;
  }
}
