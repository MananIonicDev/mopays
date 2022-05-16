import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsCommentPageRoutingModule } from './jobs-comment-routing.module';

import { JobsCommentPage } from './jobs-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsCommentPageRoutingModule
  ],
  declarations: [JobsCommentPage]
})
export class JobsCommentPageModule {}
