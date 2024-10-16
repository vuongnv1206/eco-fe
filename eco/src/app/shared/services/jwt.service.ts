import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private USER_TOKEN_KEY = 'user_token';
  private REFRESH_TOKEN = 'refresh_token';
  private REFRESH_TOKEN_EXPIRES = 'refresh_token_expires';
  private USER = 'user';

  constructor() {
    // Listener để lắng nghe các sự kiện storage, dùng khi có nhiều tab
    window.addEventListener('storage', (event) => {
      if (event.key === this.USER_TOKEN_KEY && !event.newValue) {
        this.destroyToken();
        window.location.assign('/');
      }
    });
  }

  // Lấy JWT từ localStorage
  getToken(): string | null {
    return window.localStorage.getItem(this.USER_TOKEN_KEY);
  }

  // Lấy Refresh Token từ localStorage
  getRefreshToken(): string | null {
    return window.localStorage.getItem(this.REFRESH_TOKEN);
  }

  // Lấy thời gian hết hạn của Refresh Token
  getRefreshTokenExpiryTime(): string | null {
    return window.localStorage.getItem(this.REFRESH_TOKEN_EXPIRES);
  }

  // Lưu token và refresh token vào localStorage
  saveToken(data: { token: string; refreshToken: string; refreshTokenExpiryTime: string }): void {
    window.localStorage.setItem(this.USER_TOKEN_KEY, data.token);
    window.localStorage.setItem(this.REFRESH_TOKEN, data.refreshToken);
    window.localStorage.setItem(this.REFRESH_TOKEN_EXPIRES, data.refreshTokenExpiryTime);
  }

  // Xóa token và refresh token khỏi localStorage
  destroyToken(): void {
    window.localStorage.removeItem(this.USER_TOKEN_KEY);
    window.localStorage.removeItem(this.REFRESH_TOKEN);
    window.localStorage.removeItem(this.REFRESH_TOKEN_EXPIRES);
  }

  // Lưu thông tin người dùng vào localStorage
  saveUser(user: any): void {
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  }

  // Lấy thông tin người dùng từ localStorage
  getUser(): any {
    const user = window.localStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  }

  // Lấy header Authorization cho API request
  getAuthHeader(): string {
    return `Bearer ${this.getToken()}`;
  }

  // Kiểm tra xem người dùng có đăng nhập hay không (dựa vào token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Parse JWT để lấy thông tin payload
  parseToken(token: string): any {
    if (!token) {
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  // Parse token từ localStorage
  parseTokenLocal(): any {
    const token = this.getToken();
    return token ? this.parseToken(token) : null;
  }
}
