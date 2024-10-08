import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { FullProductComponent } from './product/full-product/full-product.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderCreatedComponent } from './order-created/order-created.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'products/:id',
        component: FullProductComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order-success',
        component: OrderCreatedComponent,
      },
      {
        path: 'orders/:id',
        component: OrderComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
