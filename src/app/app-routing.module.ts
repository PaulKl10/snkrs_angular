import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil/accueil.component';
import { NftComponent } from './page-nft/nft/nft.component';
import { CollectionsComponent } from './collections/collections/collections.component';
import { CategoryComponent } from './collections/category/category.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  { path: "", component: AccueilComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "nft/:id", component: NftComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  {
    path: "collection", component: CollectionsComponent, children: [
      { path: "category/:id", component: CategoryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
