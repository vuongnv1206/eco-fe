import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.services';
import { LOGIN_URL } from '../shared/constants/url.const';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    userMenuItems!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        private authService : AuthService,
        private router: Router
        ) { }
  
      ngOnInit(): void {
        this.userMenuItems = [
          {
            label: 'File',
            items: [{
                    label: 'Personal Information',
                    icon: 'pi pi-id-card',
                    routerLink: '/profile',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Change Password',
            icon: 'pi pi-key',
            routerLink: '/change-password',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: event => {
              this.authService.signOut();
              this.router.navigate([LOGIN_URL]);
            }
        }
        ];
      }
}
