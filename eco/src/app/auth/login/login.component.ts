import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginModel } from '../../shared/models/auth.dto';
import { Router } from '@angular/router';
import { JwtService } from '../../shared/services/jwt.service';
import { Subject, takeUntil } from 'rxjs';
import { HOME_URL } from '../../shared/constants/url.const';
import { AuthStore } from '../../shared/stores/auth.store';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;

  loginForm: FormGroup;

  public blockedPanel: boolean = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private authStore: AuthStore,
    private router: Router,
    private jwtService: JwtService,
    private notificationService: NotificationService

) {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    this.toggleBlockUI(true);
    var request: LoginModel = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };
  
    this.authStore.login(request.username, request.password).subscribe({
      next: (response) => {
        this.toggleBlockUI(false);
        this.router.navigate([HOME_URL]); // Điều hướng đến trang chính
      },
      error: (error) => {
        this.toggleBlockUI(false);
        this.notificationService.showError('Đăng nhập không đúng.'); // Hiển thị thông báo lỗi
      },
    });
  }
  
  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
