import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagemodalbizproPageRoutingModule } from './imagemodalbizpro-routing.module';

//import { ImagemodalbizproPage } from './imagemodalbizpro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagemodalbizproPageRoutingModule
  ],
  //declarations: [ImagemodalbizproPage]
})
export class ImagemodalbizproPageModule {}
