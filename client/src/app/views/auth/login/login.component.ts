import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitAttempted: boolean = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private jwtService: JwtService
  ) { }

  login() {
    if (this.loginForm.valid) {
      this.submitAttempted = false;
      this.authService.login(this.loginForm.value).subscribe((res: { token: string }) => {
        if (res && res.token) {
          this.jwtService.saveToken(res.token);
          this.notificationService.showSuccess('Welcom to Chatties', 'Login SuccessFull');
          this.router.navigateByUrl('/chat');
        } else {
          this.notificationService.showError('Please Try To Login Again', 'Login Failed');
        }
      }, (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error, 'Login Failed');
      })
    } else {
      this.submitAttempted = true;
    }
  }

}
