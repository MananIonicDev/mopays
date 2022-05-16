import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessEditPageRoutingModule } from './business-edit-routing.module';

import { BusinessEditPage } from './business-edit.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    BusinessEditPageRoutingModule
  ],
  declarations: [BusinessEditPage]
})
export class BusinessEditPageModule {}
