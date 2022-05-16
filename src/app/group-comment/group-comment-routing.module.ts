import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupCommentPage } from './group-comment.page';

const routes: Routes = [
  {
    path: '',
    component: GroupCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupCommentPageRoutingModule {}
