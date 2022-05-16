import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickAddPageRoutingModule } from './quick-add-routing.module';

import { QuickAddPage } from './quick-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickAddPageRoutingModule
  ],
  declarations: [QuickAddPage]
})
export class QuickAddPageModule {}
