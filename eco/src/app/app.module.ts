import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppRoutingModule } from './app.routes';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificationService } from './shared/services/notification.service';
import { UtilityService } from './shared/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from '../environments/environment';
import { SystemModule } from './system/system.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { ErrorHandlerService } from './shared/services/error-handler.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    SystemModule,
  ],
  providers: [
    DialogService,
    MessageService,
    NotificationService,
    ConfirmationService,
    UtilityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1023196294291-shhj66sk824th978fd2eqcfd1omnf0or.apps.googleusercontent.com', {
              scopes: ['email']
            }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }