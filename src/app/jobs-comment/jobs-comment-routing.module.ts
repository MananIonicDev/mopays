import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsCommentPage } from './jobs-comment.page';

const routes: Routes = [
  {
    path: '',
    component: JobsCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsCommentPageRoutingModule {}
