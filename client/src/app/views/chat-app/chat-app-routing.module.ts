import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { authGuard } from 'src/app/core/auth/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    component: ChatAppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAppRoutingModule { }
