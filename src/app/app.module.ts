import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilModule } from './accueil/accueil.module';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { PageNftModule } from './page-nft/page-nft.module';
import { CollectionsModule } from './collections/collections.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccueilModule,
    HttpClientModule,
    NgChartsModule,
    CommonModule,
    PageNftModule,
    CollectionsModule,
    FormsModule,
    DashboardModule
  ],
  providers: [ApiService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      }      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
