import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingByCategoryPageRoutingModule } from './listing-by-category-routing.module';

import { ListingByCategoryPage } from './listing-by-category.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    ListingByCategoryPageRoutingModule
  ],
  declarations: [ListingByCategoryPage]
})
export class ListingByCategoryPageModule {}
