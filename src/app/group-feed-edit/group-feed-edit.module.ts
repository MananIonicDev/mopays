import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupFeedEditPageRoutingModule } from './group-feed-edit-routing.module';

import { GroupFeedEditPage } from './group-feed-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupFeedEditPageRoutingModule
  ],
  declarations: [GroupFeedEditPage]
})
export class GroupFeedEditPageModule {}
