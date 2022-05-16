import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreCommentPageRoutingModule } from './explore-comment-routing.module';

import { ExploreCommentPage } from './explore-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    ExploreCommentPageRoutingModule
  ],
  declarations: [ExploreCommentPage]
})
export class ExploreCommentPageModule {}
