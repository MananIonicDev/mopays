import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesModalPageRoutingModule } from './categories-modal-routing.module';

import { CategoriesModalPage } from './categories-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesModalPageRoutingModule
  ],
  declarations: [CategoriesModalPage]
})
export class CategoriesModalPageModule {}
