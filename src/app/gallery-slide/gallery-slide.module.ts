import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GallerySlidePageRoutingModule } from './gallery-slide-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

//import { GallerySlidePage } from './gallery-slide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxIonicImageViewerModule,
    IonicModule,
    GallerySlidePageRoutingModule
  ],
  //declarations: [GallerySlidePage]
})
export class GallerySlidePageModule {}
