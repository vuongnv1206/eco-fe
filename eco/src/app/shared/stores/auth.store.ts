import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, firstValueFrom, catchError, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.services';

export interface User {
  id: string;
  fullName: string;
  emailaddress: string;
  phone: string;
  permission?: string[]
}

export const Action = {
  View: 'View',
  Create: 'Create',
  Update: 'Update',
  Delete: 'Delete',
  Export: 'Export',
  Import: 'Import',
}

export const Resource = {
  Dashboard: 'Dashboard',
  Users: 'Users',
  UserRoles: 'UserRoles',
  Roles: 'Roles',
  RoleClaims: 'RoleClaims',
  Products: 'Products',
  Categories: 'Categories',
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
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

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      tap((response: any) => { // Thay đổi kiểu dữ liệu cho response nếu cần
        if (response.token) { // Sửa đổi thành response.token
          this.isAuthenticatedSubject.next(true);
          const userParse = this.jwtService.parseToken(response.token);
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
      }),
      catchError((error) => {
        this.isAuthenticatedSubject.next(false);
        this.userSubject.next(null);
        return throwError(() => error); // Ném lỗi để xử lý trong component
      })
    );
  }
  signOut(): void {
    // Cập nhật trạng thái của các BehaviorSubject
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  
    // Xóa token và thông tin người dùng
    this.jwtService.destroyToken();
    this.jwtService.destroyUser();
  }
  

  mustHavePermission(action: string, resource: string): boolean {
    if (!this.userSubject) {
      return false
    }
    if (!this.userSubject.value.permission) {
      return false
    }
    return this.userSubject.value.permission.some((p) => p === `Permissions.${resource}.${action}`)
  }
  hasAccess(permission: string): boolean {
    const splitPermission = permission.split('.')
    if (splitPermission.length !== 2) {
      return false
    }
    return this.mustHavePermission(splitPermission[1], splitPermission[0])
  }
}
