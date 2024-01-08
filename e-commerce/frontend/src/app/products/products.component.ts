import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ApiService } from '../api/api.service';
import { Product, ProductCategory } from '../api/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {
    this.getProducts();
  }

  getProducts(category?: ProductCategory) {
    this.api.allProducts(category).then((res) => {
      this.products = res.products;
    });
  }
}
