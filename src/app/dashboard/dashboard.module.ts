import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api/api.service';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [ApiService]
})
export class DashboardModule { }
