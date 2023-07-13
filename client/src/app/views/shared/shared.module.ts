import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search/search.pipe';



@NgModule({
  declarations: [
    SearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe
  ],
  providers: [
    SearchPipe
  ]
})
export class SharedModule { }
