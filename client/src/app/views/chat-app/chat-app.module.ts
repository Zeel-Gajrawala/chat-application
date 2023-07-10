import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatAppComponent
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChatAppModule { }
