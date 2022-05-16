import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageModalBusinessPageRoutingModule } from './image-modal-business-routing.module';
//import { ImageModalBusinessPage } from './image-modal-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageModalBusinessPageRoutingModule
  ],
  //declarations: [ImageModalBusinessPage]
})
export class ImageModalBusinessPageModule {}
