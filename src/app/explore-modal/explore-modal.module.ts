import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreModalPageRoutingModule } from './explore-modal-routing.module';

import { ExploreModalPage } from './explore-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreModalPageRoutingModule
  ],
  declarations: [ExploreModalPage]
})
export class ExploreModalPageModule {}
