import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingSearchPageRoutingModule } from './listing-search-routing.module';

import { ListingSearchPage } from './listing-search.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    ListingSearchPageRoutingModule
  ],
  declarations: [ListingSearchPage]
})
export class ListingSearchPageModule {}
