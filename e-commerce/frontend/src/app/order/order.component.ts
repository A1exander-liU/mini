import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullOrder } from '../api/types';
import { ApiService } from '../api/api.service';
import { OrderHistoryItemComponent } from './order-history-item/order-history-item.component';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderHistoryItemComponent, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  order: FullOrder | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.api.getOneOrder(id).then((res) => {
      this.order = { ...res.order };
    });
  }

  goBack() {
    this.location.back();
  }
}
