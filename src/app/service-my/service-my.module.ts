import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceMyPageRoutingModule } from './service-my-routing.module';

import { ServiceMyPage } from './service-my.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ServiceMyPageRoutingModule
  ],
  declarations: [ServiceMyPage]
})
export class ServiceMyPageModule {}
