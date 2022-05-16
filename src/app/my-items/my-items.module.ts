import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyItemsPageRoutingModule } from './my-items-routing.module';

import { MyItemsPage } from './my-items.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    MyItemsPageRoutingModule
  ],
  declarations: [MyItemsPage]
})
export class MyItemsPageModule {}
