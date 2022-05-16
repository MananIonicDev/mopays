import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingCommentPage } from './listing-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ListingCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingCommentPageRoutingModule {}
