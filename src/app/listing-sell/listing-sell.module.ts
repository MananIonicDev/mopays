import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingSellPageRoutingModule } from './listing-sell-routing.module';

import { ListingSellPage } from './listing-sell.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListingSellPageRoutingModule
  ],
  declarations: [ListingSellPage]
})
export class ListingSellPageModule {}
