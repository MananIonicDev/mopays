import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessCommentPage } from './business-comment.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessCommentPageRoutingModule {}
