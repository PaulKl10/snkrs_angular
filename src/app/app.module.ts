import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilModule } from './accueil/accueil.module';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { PageNftModule } from './page-nft/page-nft.module';
import { CollectionsModule } from './collections/collections.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccueilModule,
    HttpClientModule,
    NgChartsModule,
    CommonModule,
    PageNftModule,
    CollectionsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
