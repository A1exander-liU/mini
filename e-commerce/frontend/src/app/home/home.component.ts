import { Component, OnInit } from '@angular/core';
import { Product } from '../api/types';
import { ApiService } from '../api/api.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly api: ApiService) {}

  chooseRandomElements<T>(array: T[], amount: number): T[] {
    const elements: T[] = [];

    for (let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * array.length);
      elements.push(array[index]);
      array.splice(index, 1);
    }

    return elements;
  }

  ngOnInit(): void {
    this.api.allProducts().then((res) => {
      this.products = this.chooseRandomElements<Product>(res.products, 6);
      console.log(this.products);
    });
  }
}
