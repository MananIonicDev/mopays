import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingSubcatPageRoutingModule } from './listing-subcat-routing.module';

import { ListingSubcatPage } from './listing-subcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingSubcatPageRoutingModule
  ],
  declarations: [ListingSubcatPage]
})
export class ListingSubcatPageModule {}
