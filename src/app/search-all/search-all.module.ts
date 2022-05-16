import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAllPageRoutingModule } from './search-all-routing.module';

import { SearchAllPage } from './search-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchAllPageRoutingModule
  ],
  declarations: [SearchAllPage]
})
export class SearchAllPageModule {}
