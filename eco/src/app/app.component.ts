import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

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
    private router: Router
    ){
  }
  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
  };
}