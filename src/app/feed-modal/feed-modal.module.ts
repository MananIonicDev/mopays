import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedModalPageRoutingModule } from './feed-modal-routing.module';

import { FeedModalPage } from './feed-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedModalPageRoutingModule
  ],
  //declarations: [FeedModalPage]
})
export class FeedModalPageModule {}
