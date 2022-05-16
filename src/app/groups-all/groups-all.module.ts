import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsAllPageRoutingModule } from './groups-all-routing.module';

import { GroupsAllPage } from './groups-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsAllPageRoutingModule
  ],
  //declarations: [GroupsAllPage]
})
export class GroupsAllPageModule {}
