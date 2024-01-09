import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/api.service';
import {
  Ball,
  Collectible,
  FullProduct,
  HeldItem,
  Medicine,
} from '../../api/types';
import { MedicineProductComponent } from '../medicine-product/medicine-product.component';
import { CollectibleProductComponent } from '../collectible-product/collectible-product.component';
import { HeldItemProductComponent } from '../held-item-product/held-item-product.component';
import { BallProductComponent } from '../ball-product/ball-product.component';
import {
  CurrencyPipe,
  Location,
  NgComponentOutlet,
  TitleCasePipe,
} from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-full-product',
  standalone: true,
  imports: [
    MedicineProductComponent,
    CollectibleProductComponent,
    HeldItemProductComponent,
    BallProductComponent,
    NgComponentOutlet,
    TitleCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './full-product.component.html',
  styleUrl: './full-product.component.css',
})
export class FullProductComponent implements OnInit {
  loggedIn = false;
  product: FullProduct | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly location: Location,
    private readonly auth: AuthService
  ) {
    auth.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.oneProduct(parseInt(id != null ? id : '0')).then((res) => {
      this.product = res.product;
      if (this.product.category === 'collectible') {
      }
    });
    this.auth.authEvent.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  getMedicineDetails() {
    return this.product?.details as Medicine;
  }

  getCollectibleDetails() {
    return this.product?.details as Collectible;
  }

  getHeldItemDetails() {
    return this.product?.details as HeldItem;
  }

  getBallDetails() {
    return this.product?.details as Ball;
  }

  addToCart() {
    if (!this.product) {
      return;
    }
    this.api.addToCart(this.product.id);
  }

  goBack() {
    this.location.back();
  }
}
