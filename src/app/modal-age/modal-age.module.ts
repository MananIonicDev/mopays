import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAgePageRoutingModule } from './modal-age-routing.module';

//import { ModalAgePage } from './modal-age.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAgePageRoutingModule
  ],
  //declarations: [ModalAgePage]
})
export class ModalAgePageModule {}
