import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserModalPicturePageRoutingModule } from './user-modal-picture-routing.module';

//import { UserModalPicturePage } from './user-modal-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserModalPicturePageRoutingModule
  ],
  //declarations: [UserModalPicturePage]
})
export class UserModalPicturePageModule {}
