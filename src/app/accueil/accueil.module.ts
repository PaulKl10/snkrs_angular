import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiService } from '../services/api/api.service';
import { NftsComponent } from './nfts/nfts.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AccueilComponent,
    NftsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AccueilComponent
  ],
  providers: [ApiService]
})
export class AccueilModule { }
