import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchPageRoutingModule } from './scratch-routing.module';

import { ScratchPage } from './scratch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchPageRoutingModule
  ],
  declarations: [ScratchPage]
})
export class ScratchPageModule {}
