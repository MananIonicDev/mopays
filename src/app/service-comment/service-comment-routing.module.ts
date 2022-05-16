import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCommentPage } from './service-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCommentPageRoutingModule {}
