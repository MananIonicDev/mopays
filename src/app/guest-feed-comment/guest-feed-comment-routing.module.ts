import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestFeedCommentPage } from './guest-feed-comment.page';

const routes: Routes = [
  {
    path: '',
    component: GuestFeedCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestFeedCommentPageRoutingModule {}
