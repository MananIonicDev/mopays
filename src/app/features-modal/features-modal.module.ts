import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturesModalPageRoutingModule } from './features-modal-routing.module';

import { FeaturesModalPage } from './features-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturesModalPageRoutingModule
  ],
  declarations: [FeaturesModalPage]
})
export class FeaturesModalPageModule {}
