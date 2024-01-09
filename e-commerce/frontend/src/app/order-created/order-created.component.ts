import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-created',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-created.component.html',
  styleUrl: './order-created.component.css',
})
export class OrderCreatedComponent {}
