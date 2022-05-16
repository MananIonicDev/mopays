import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceImageEditPageRoutingModule } from './service-image-edit-routing.module';

import { ServiceImageEditPage } from './service-image-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceImageEditPageRoutingModule
  ],
  declarations: [ServiceImageEditPage]
})
export class ServiceImageEditPageModule {}
