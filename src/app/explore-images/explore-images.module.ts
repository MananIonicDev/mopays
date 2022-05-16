import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreImagesPageRoutingModule } from './explore-images-routing.module';

import { ExploreImagesPage } from './explore-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreImagesPageRoutingModule
  ],
  //declarations: [ExploreImagesPage]
})
export class ExploreImagesPageModule {}
