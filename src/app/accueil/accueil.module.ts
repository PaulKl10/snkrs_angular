import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiService } from '../services/api/api.service';
import { NftsComponent } from './nfts/nfts.component';


@NgModule({
  declarations: [
    AccueilComponent,
    NftsComponent
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
