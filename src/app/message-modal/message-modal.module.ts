import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageModalPageRoutingModule } from './message-modal-routing.module';

import { MessageModalPage } from './message-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageModalPageRoutingModule
  ],
  declarations: [MessageModalPage]
})
export class MessageModalPageModule {}
