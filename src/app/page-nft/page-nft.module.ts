import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftComponent } from './nft/nft.component';
import { ApiService } from '../services/api/api.service';
import { CourbeEthComponent } from './courbe-eth/courbe-eth.component';



@NgModule({
  declarations: [
    NftComponent,
    CourbeEthComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [ApiService]
})
export class PageNftModule { }
