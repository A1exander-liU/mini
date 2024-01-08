import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRes, LoginReq, MeRes } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private readonly client: HttpClient) {}

  private get<T>(url: string, options?: Parameters<typeof this.client.get>[1]) {
    return this.client.get<T>(this.baseUrl + url, {
      ...options,
      withCredentials: true,
    });
  }

  private post<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.post>[2]
  ) {
    return this.client.post<T>(this.baseUrl + url, body, {
      ...options,
      withCredentials: true,
    });
  }

  private put<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.put>[2]
  ) {
    return this.client.put<T>(this.baseUrl + url, body, {
      ...options,
      withCredentials: true,
    });
  }

  private patch<T>(
    url: string,
    body: any,
    options?: Parameters<typeof this.client.patch>[2]
  ) {
    return this.client.patch<T>(this.baseUrl + url, body, {
      ...options,
      withCredentials: true,
    });
  }

  private delete<T>(
    url: string,
    options?: Parameters<typeof this.client.delete>[1]
  ) {
    return this.client.delete<T>(this.baseUrl + url, {
      ...options,
      withCredentials: true,
    });
  }

  login(req: LoginReq) {
    this.post<BaseRes>('/v1/auth/login', req).subscribe((res) => {
      this.get<MeRes>('/v1/auth/me').subscribe((res) => {
        console.log(res);
      });
      console.log(res);
    });
  }
}
