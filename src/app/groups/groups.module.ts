import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';

import { GroupsPage } from './groups.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { GroupsAllPage } from '../groups-all/groups-all.page';
import { GroupsMyPage } from '../groups-my/groups-my.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    GroupsPageRoutingModule
  ],
  declarations: [GroupsPage, GroupsAllPage, GroupsMyPage],
  entryComponents: [GroupsAllPage, GroupsMyPage]
})
export class GroupsPageModule {}
