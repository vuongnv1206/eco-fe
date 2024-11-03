import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router, // Inject Router để điều hướng nếu cần
  ) {}

  login(email: string, password: string): Observable<any> {
    return from(this.apiService.post('/tokens/get', { email, password }).pipe(
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
    ))
  }

  public signInWithGoogle(idToken: string): Promise<any> {
    // Send the idToken to the API
    return this.apiService.post('/auth/google',  {idToken} ).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.jwtService.saveToken(response); // Save token in local storage
          this.jwtService.saveUser(this.jwtService.parseTokenLocal()); // Save user info locally
        }
        return response;
      }),
      catchError((error) => {
        console.error('API authentication failed', error);
        throw error;
      })
    ).toPromise();
  }

  // public signInWithFacebook = () => {
  //   this.externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  // }

}
