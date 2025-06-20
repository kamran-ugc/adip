import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MosRoutingModule } from './mos-routing.module';
import { MosComponent } from './mos.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MosRoutingModule, RouterModule, MosComponent],
})
export class MosModule { }