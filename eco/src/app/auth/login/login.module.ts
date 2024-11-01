import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        BlockUIModule,
        ProgressSpinnerModule,
        DividerModule,
        GoogleSigninButtonModule,
        SocialLoginModule,
    ],
    declarations: [LoginComponent],
})
export class LoginModule { }
