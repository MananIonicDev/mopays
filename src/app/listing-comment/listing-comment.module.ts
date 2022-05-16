import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingCommentPageRoutingModule } from './listing-comment-routing.module';

import { ListingCommentPage } from './listing-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingCommentPageRoutingModule
  ],
  declarations: [ListingCommentPage]
})
export class ListingCommentPageModule {}
