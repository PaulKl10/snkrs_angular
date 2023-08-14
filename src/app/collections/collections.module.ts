import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCategoriesComponent } from './nav-categories/nav-categories.component';
import { CategoryComponent } from './category/category.component';
import { CollectionsComponent } from './collections/collections.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavCategoriesComponent,
    CategoryComponent,
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CollectionsModule { }
