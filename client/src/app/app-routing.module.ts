import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadChildren: () => import('./views/chat-app/chat-app.module').then((m) => m.ChatAppModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
