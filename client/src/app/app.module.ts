import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './views/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token')
      }
    }),
  ],
  providers: [
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
