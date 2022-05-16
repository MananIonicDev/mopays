import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessCommentPageRoutingModule } from './business-comment-routing.module';

import { BusinessCommentPage } from './business-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    BusinessCommentPageRoutingModule
  ],
  declarations: [BusinessCommentPage]
})
export class BusinessCommentPageModule {}
