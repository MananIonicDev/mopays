import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPostPageRoutingModule } from './group-post-routing.module';

import { GroupPostPage } from './group-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPostPageRoutingModule
  ],
  declarations: [GroupPostPage]
})
export class GroupPostPageModule {}
