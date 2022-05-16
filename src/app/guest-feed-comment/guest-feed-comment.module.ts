import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestFeedCommentPageRoutingModule } from './guest-feed-comment-routing.module';

import { GuestFeedCommentPage } from './guest-feed-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    GuestFeedCommentPageRoutingModule
  ],
  declarations: [GuestFeedCommentPage]
})
export class GuestFeedCommentPageModule {}
