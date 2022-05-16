import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreCategoryPageRoutingModule } from './explore-category-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExploreCategoryPage } from './explore-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ExploreCategoryPageRoutingModule
  ],
  declarations: [ExploreCategoryPage]
})
export class ExploreCategoryPageModule {}
