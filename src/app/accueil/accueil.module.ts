import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiService } from '../api.service';


@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccueilComponent
  ],
  providers: [ApiService]
})
export class AccueilModule { }
