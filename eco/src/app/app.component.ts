import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthStore } from './shared/stores/auth.store';
import { LOGIN_URL } from './shared/constants/url.const';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  menuMode = 'static';
  constructor(
    private primeNgConfig : PrimeNGConfig,
    private router: Router,
    private authStore: AuthStore
    ){
  }
  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
    if(this.authStore.isAuthenticated()){
      this.router.navigate([LOGIN_URL]);
    }
  }
}