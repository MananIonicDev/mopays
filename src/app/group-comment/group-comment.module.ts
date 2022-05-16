import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupCommentPageRoutingModule } from './group-comment-routing.module';

import { GroupCommentPage } from './group-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    GroupCommentPageRoutingModule
  ],
  declarations: [GroupCommentPage]
})
export class GroupCommentPageModule {}
