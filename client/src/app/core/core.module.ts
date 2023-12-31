import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { JwtService } from './services/jwt/jwt.service';
import { SocketioService } from './services/socketio/socketio.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SocketioService,
    AuthService,
    NotificationService,
    JwtService
  ]
})
export class CoreModule { }
