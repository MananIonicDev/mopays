import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsMyPageRoutingModule } from './groups-my-routing.module';

import { GroupsMyPage } from './groups-my.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsMyPageRoutingModule
  ],
  //declarations: [GroupsMyPage]
})
export class GroupsMyPageModule {}
