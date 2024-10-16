import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = 'http://localhost:5000/api';

   // Inject HttpClient và JwtService qua constructor
   constructor(private http: HttpClient, private jwtService: JwtService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.jwtService.getAuthHeader(),  // Đặt token của bạn ở đây nếu cần
      // Các header khác nếu cần
    });
  }

  // GET request
  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.api_url}${path}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // POST request
  post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.api_url}${path}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // PUT request
  put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.api_url}${path}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE request
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.api_url}${path}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // PATCH request
  patch<T>(path: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.api_url}${path}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // HEAD request
  head<T>(path: string): Observable<T> {
    return this.http.head<T>(`${this.api_url}${path}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // OPTIONS request
  options<T>(path: string): Observable<T> {
    return this.http.options<T>(`${this.api_url}${path}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Custom request
  request<T>(method: string, path: string, data?: any): Observable<T> {
    return this.http.request<T>(method, `${this.api_url}${path}`, {
      body: data,
      headers: this.getAuthHeaders(),
    });
  }
}
