import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInterestPageRoutingModule } from './modal-interest-routing.module';

//import { ModalInterestPage } from './modal-interest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInterestPageRoutingModule
  ],
  //declarations: [ModalInterestPage]
})
export class ModalInterestPageModule {}
