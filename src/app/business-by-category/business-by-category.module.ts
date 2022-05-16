import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessByCategoryPageRoutingModule } from './business-by-category-routing.module';

import { BusinessByCategoryPage } from './business-by-category.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    BusinessByCategoryPageRoutingModule
  ],
  declarations: [BusinessByCategoryPage]
})
export class BusinessByCategoryPageModule {}
