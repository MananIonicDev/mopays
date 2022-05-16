import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubCategoryPageRoutingModule } from './pub-category-routing.module';

import { PubCategoryPage } from './pub-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubCategoryPageRoutingModule
  ],
  //declarations: [PubCategoryPage]
})
export class PubCategoryPageModule {}
