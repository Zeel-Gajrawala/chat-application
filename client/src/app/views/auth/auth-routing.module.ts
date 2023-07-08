import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from 'src/app/core/auth/auth-guard/auth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [authGuard], component: LoginComponent },
  { path: 'register', canActivate: [authGuard], component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
