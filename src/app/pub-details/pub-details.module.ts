import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubDetailsPageRoutingModule } from './pub-details-routing.module';

import { PubDetailsPage } from './pub-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubDetailsPageRoutingModule
  ],
  declarations: [PubDetailsPage]
})
export class PubDetailsPageModule {}
