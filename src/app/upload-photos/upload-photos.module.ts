import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPhotosPageRoutingModule } from './upload-photos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadPhotosPage } from './upload-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UploadPhotosPageRoutingModule
  ],
  declarations: [UploadPhotosPage]
})
export class UploadPhotosPageModule {}
