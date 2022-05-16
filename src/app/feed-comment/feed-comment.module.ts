import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedCommentPageRoutingModule } from './feed-comment-routing.module';

import { FeedCommentPage } from './feed-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    FeedCommentPageRoutingModule
  ],
  declarations: [FeedCommentPage]
})
export class FeedCommentPageModule {}
