import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseRes,
  LoginReq,
  MeRes,
  ProductsRes,
  FullProduct,
  OneProductRes,
  ProductCategory,
  GetCartItemsRes,
  CreateOrderReq,
  AllOrdersRes,
  OneOrderRes,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private readonly client: HttpClient) {}

  private async get<T>(
    url: string,
    options?: Parameters<typeof this.client.get>[1]
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client
        .get<T>(this.baseUrl + url, {
          ...options,
          withCredentials: true,
        })
        .subscribe({
          next: (data) => resolve(data),
          error: (err: HttpErrorResponse) => reject(err),
        });
    });
  }

  private post<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.post>[2]
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client
        .post<T>(this.baseUrl + url, body, {
          ...options,
          withCredentials: true,
        })
        .subscribe({
          next: (data) => resolve(data),
          error: (err: HttpErrorResponse) => reject(err),
        });
    });
  }

  private put<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.put>[2]
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client
        .put<T>(this.baseUrl + url, body, { ...options, withCredentials: true })
        .subscribe({
          next: (data) => resolve(data),
          error: (err: HttpErrorResponse) => reject(err),
        });
    });
  }

  private patch<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.patch>[2]
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .patch<T>(this.baseUrl + url, body, {
          ...options,
          withCredentials: true,
        })
        .subscribe({
          next: (data) => resolve(data),
          error: (err: HttpErrorResponse) => reject(err),
        });
    });
  }

  private delete<T>(
    url: string,
    options?: Parameters<typeof this.client.delete>[1]
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client
        .delete<T>(this.baseUrl + url, { ...options, withCredentials: true })
        .subscribe({
          next: (data) => resolve(data),
          error: (err: HttpErrorResponse) => reject(err),
        });
    });
  }

  async login(req: LoginReq): Promise<BaseRes> {
    return this.post<BaseRes>('/v1/auth/login', req);
  }

  async me(): Promise<MeRes> {
    return this.get<MeRes>('/v1/auth/me');
  }

  async logout(): Promise<BaseRes> {
    return this.get<BaseRes>('/v1/auth/logout');
  }

  async allProducts(category?: ProductCategory): Promise<ProductsRes> {
    return this.get<ProductsRes>(
      `/v1/products${category != null ? `?category=${category}` : ''}`
    );
  }

  async oneProduct(id: number): Promise<OneProductRes> {
    return this.get<OneProductRes>(`/v1/products/${id}`);
  }

  async addToCart(id: number) {
    return this.put<BaseRes>(`/v1/cart/${id}`, null);
  }

  async updateCartItem(id: number, operation: 'inc' | 'dec') {
    return this.patch<BaseRes>(`/v1/cart/${id}?operation=${operation}`, null);
  }

  async removeFromCart(id: number) {
    return this.delete<BaseRes>(`/v1/cart/${id}`);
  }

  async getCartItems() {
    return this.get<GetCartItemsRes>(`/v1/cart`);
  }

  async createOrder(req: CreateOrderReq) {
    return this.post<BaseRes>('/v1/orders', req);
  }

  async getOrders() {
    return this.get<AllOrdersRes>('/v1/orders');
  }

  async getOneOrder(orderId: number) {
    return this.get<OneOrderRes>(`/v1/orders/${orderId}`);
  }
}
