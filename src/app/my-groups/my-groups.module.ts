import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGroupsPageRoutingModule } from './my-groups-routing.module';

import { MyGroupsPage } from './my-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyGroupsPageRoutingModule
  ],
  declarations: [MyGroupsPage]
})
export class MyGroupsPageModule {}
