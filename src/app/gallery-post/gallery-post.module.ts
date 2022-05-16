import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPostPageRoutingModule } from './gallery-post-routing.module';

import { GalleryPostPage } from './gallery-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPostPageRoutingModule
  ],
  declarations: [GalleryPostPage]
})
export class GalleryPostPageModule {}
