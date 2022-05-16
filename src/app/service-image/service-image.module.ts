import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceImagePageRoutingModule } from './service-image-routing.module';

import { ServiceImagePage } from './service-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceImagePageRoutingModule
  ],
  declarations: [ServiceImagePage]
})
export class ServiceImagePageModule {}
