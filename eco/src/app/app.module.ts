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

  ],
  providers: [
    DialogService,
    MessageService,
    NotificationService,
    ConfirmationService,
    UtilityService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }