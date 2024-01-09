import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-menu.component.html',
  styleUrl: './cart-menu.component.css',
})
export class CartMenuComponent {
  @Input() loggedIn = false;
}
