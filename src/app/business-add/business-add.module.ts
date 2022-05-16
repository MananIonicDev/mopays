import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessAddPageRoutingModule } from './business-add-routing.module';

import { BusinessAddPage } from './business-add.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BusinessAddPageRoutingModule
  ],
  declarations: [BusinessAddPage]
})
export class BusinessAddPageModule {}
