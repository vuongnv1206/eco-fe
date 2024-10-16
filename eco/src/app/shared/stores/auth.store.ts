import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export interface User {
  id: string;
  fullName: string;
  emailaddress: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private jwtService: JwtService) {}

  // Lấy Observable của user
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  // Lấy Observable của isAuthenticated
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  checkAuth() {
    const token = this.jwtService.getToken();
    if (token) {
      this.isAuthenticatedSubject.next(true);
      this.userSubject.next(this.jwtService.getUser());
    } else {
      this.isAuthenticatedSubject.next(false);
      this.userSubject.next(null);
    }
  }

  login(email: string, password: string): Promise<any> {
    return this.authService
      .login(email, password)
      .then((response) => {
        if (response.data.token) {
          this.isAuthenticatedSubject.next(true);
          const userParse = this.jwtService.parseToken(response.data.token);
          const user: User = {
            id: userParse['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            fullName: userParse.fullName,
            emailaddress: userParse['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            phone: userParse['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
          };
          this.userSubject.next(user);
        } else {
          this.isAuthenticatedSubject.next(false);
          this.userSubject.next(null);
        }
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        this.isAuthenticatedSubject.next(false);
        this.userSubject.next(null);
        return Promise.reject(error);
      });
  }
}
