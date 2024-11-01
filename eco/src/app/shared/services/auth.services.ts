import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private extAuthChangeSub = new Subject<SocialUser>();
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router, // Inject Router để điều hướng nếu cần
        private externalAuthService: SocialAuthService
      ) {
        this.externalAuthService.authState.subscribe((user) => {
          console.log(user)
          this.extAuthChangeSub.next(user);
        })
      }

  login(email: string, password: string): Observable<any> {
    return this.apiService.post('/tokens/get', { email, password }).pipe(
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

  public signInWithGoogle = ()=> {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

}
