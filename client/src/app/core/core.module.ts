import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketioService } from './services/socketio/socketio.service';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './services/notification/notification.service';
import { JwtService } from './services/jwt/jwt.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SocketioService,
    AuthService,
    NotificationService,
    JwtService
  ]
})
export class CoreModule { }
