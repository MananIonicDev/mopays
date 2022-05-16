import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventAddPageRoutingModule } from './event-add-routing.module';

import { EventAddPage } from './event-add.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EventAddPageRoutingModule
  ],
  declarations: [EventAddPage]
})
export class EventAddPageModule {}
