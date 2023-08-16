import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiService } from '../services/api/api.service';
import { NftsComponent } from './nfts/nfts.component';
import { RouterModule } from '@angular/router';
import { AuthApiService } from '../services/AuthApi/auth-api.service';


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
  providers: [ApiService, AuthApiService]
})
export class AccueilModule { }
