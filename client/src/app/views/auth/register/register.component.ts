import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isMatching: boolean = false;
  submitAttempted: boolean = false;

  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private jwtService: JwtService
  ) { }

  passwordMatch() {
    const password = this.registerForm.controls['password'].value;
    const confirmpassword = this.registerForm.controls['confirmPassword'].value;
    if (password != confirmpassword) {
      this.isMatching = false;
    } else if (password === confirmpassword) {
      this.isMatching = true;
    }
  }

  register() {
    if (this.registerForm.valid) {

      if (this.registerForm.controls['password'].value === this.registerForm.controls['confirmPassword'].value) {

        this.submitAttempted = false;
        this.authService.register(this.registerForm.value).subscribe((res: { token: string }) => {
          if (res && res.token) {
            this.jwtService.saveToken(res.token);
            this.notificationService.showSuccess('Welcome to Chatties', 'User Registered SuccessFull');
            this.router.navigateByUrl('/chat');
          } else {
            this.notificationService.showError('Please Try To Register Again', 'Registration Failed');
          }
        }, (err: HttpErrorResponse) => {
          this.notificationService.showError(err.error, 'Registration Failed');
        })
      }
    } else {
      this.submitAttempted = true;
    }
  }

}
