import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessAddProductPageRoutingModule } from './business-add-product-routing.module';

import { BusinessAddProductPage } from './business-add-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessAddProductPageRoutingModule
  ],
  declarations: [BusinessAddProductPage]
})
export class BusinessAddProductPageModule {}
