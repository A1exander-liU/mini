import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRes, ErrorRes, LoginReq, MeRes } from './types';
import { catchError, throwError } from 'rxjs';

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
}
