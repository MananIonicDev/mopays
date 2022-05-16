import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedCommentPage } from './feed-comment.page';

const routes: Routes = [
  {
    path: '',
    component: FeedCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedCommentPageRoutingModule {}
