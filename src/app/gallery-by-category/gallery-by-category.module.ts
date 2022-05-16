import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryByCategoryPageRoutingModule } from './gallery-by-category-routing.module';

import { GalleryByCategoryPage } from './gallery-by-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryByCategoryPageRoutingModule
  ],
  declarations: [GalleryByCategoryPage]
})
export class GalleryByCategoryPageModule {}
