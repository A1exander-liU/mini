import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MeRes } from '../api/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profile: MeRes | undefined;

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.me().then((res) => {
      this.profile = { ...res };
    });

    this.api.getOrders().then((res) => {
      console.log(res.orders);
      for (let i = 0; i < res.orders.length; i++) {
        this.api.getOneOrder(res.orders[i].id).then((res) => {
          console.log(res.order);
        });
      }
    });
  }
}
