import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreCommentPage } from './explore-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreCommentPageRoutingModule {}
