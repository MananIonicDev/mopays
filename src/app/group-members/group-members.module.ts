import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupMembersPageRoutingModule } from './group-members-routing.module';

import { GroupMembersPage } from './group-members.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    GroupMembersPageRoutingModule
  ],
  declarations: [GroupMembersPage]
})
export class GroupMembersPageModule {}
