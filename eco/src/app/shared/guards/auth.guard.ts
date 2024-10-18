import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../stores/auth.store';
import { ACCESS_DENIED } from '../constants/url.const';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredPermission = route.data['permission']; // Quyền yêu cầu từ route
    if (this.authStore.hasAccess(requiredPermission)) {
      return true;
    } else {
      // Nếu không có quyền, điều hướng tới trang khác, ví dụ trang lỗi hoặc trang home
      this.router.navigate([ACCESS_DENIED]); // Trang 403 hoặc thông báo không có quyền
      return false;
    }
  }
}
