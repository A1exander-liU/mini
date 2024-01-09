import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullOrder } from '../api/types';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  order: FullOrder | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.api.getOneOrder(id).then((res) => {
      this.order = { ...res.order };
    });
  }
}
