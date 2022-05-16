import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EssentialsPageRoutingModule } from './essentials-routing.module';

import { EssentialsPage } from './essentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EssentialsPageRoutingModule
  ],
  declarations: [EssentialsPage]
})
export class EssentialsPageModule {}
