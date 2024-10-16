import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router // Inject Router để điều hướng nếu cần
      ) {}

  login(email: string, password: string): Observable<any> {
    return this.apiService.post('/tokens', { email, password }).pipe(
      map((response: any) => {
        // Kiểm tra và lưu token nếu response có chứa token
        if (response.token) {
          this.jwtService.saveToken(response); // Lưu token và các thông tin liên quan
          this.jwtService.saveUser(this.jwtService.parseTokenLocal()); // Lưu thông tin người dùng
        }
        return response;
      }),
      catchError((error) => {
        // Xử lý lỗi, có thể thêm logic ở đây nếu cần
        throw error;
      })
    );
  }

  signOut(): void {
    // Xóa token và thông tin người dùng
    this.jwtService.destroyToken();

    // Điều hướng đến trang đăng nhập (hoặc trang chủ tùy bạn)
    this.router.navigate(['/login']);
  }
}
