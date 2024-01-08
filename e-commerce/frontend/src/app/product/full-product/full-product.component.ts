import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { FullProduct } from '../../api/types';
import { MedicineProductComponent } from '../medicine-product/medicine-product.component';
import { CollectibleProductComponent } from '../collectible-product/collectible-product.component';
import { HeldItemProductComponent } from '../held-item-product/held-item-product.component';
import { BallProductComponent } from '../ball-product/ball-product.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-full-product',
  standalone: true,
  imports: [
    MedicineProductComponent,
    CollectibleProductComponent,
    HeldItemProductComponent,
    BallProductComponent,
    NgComponentOutlet,
  ],
  templateUrl: './full-product.component.html',
  styleUrl: './full-product.component.css',
})
export class FullProductComponent implements OnInit {
  product: FullProduct | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.oneProduct(parseInt(id != null ? id : '0')).then((res) => {
      this.product = res.product;
      this.getDetails();
    });
  }

  getDetails() {
    switch (this.product!.category) {
      case 'medicine': {
        this.viewContainer.createComponent(MedicineProductComponent);
        break;
      }
      case 'collectible': {
        this.viewContainer.createComponent(CollectibleProductComponent);
        break;
      }
      case 'held_item': {
        this.viewContainer.createComponent(HeldItemProductComponent);
        break;
      }
      case 'ball': {
        this.viewContainer.createComponent(BallProductComponent);
        break;
      }
    }
  }
}
