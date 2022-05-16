import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessMyPageRoutingModule } from './business-my-routing.module';

import { BusinessMyPage } from './business-my.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BusinessMyPageRoutingModule
  ],
  declarations: [BusinessMyPage]
})
export class BusinessMyPageModule {}
