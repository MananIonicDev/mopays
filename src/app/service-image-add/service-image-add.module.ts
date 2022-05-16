import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceImageAddPageRoutingModule } from './service-image-add-routing.module';

import { ServiceImageAddPage } from './service-image-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceImageAddPageRoutingModule
  ],
  declarations: [ServiceImageAddPage]
})
export class ServiceImageAddPageModule {}
