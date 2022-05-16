import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryCommentPage } from './gallery-comment.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryCommentPageRoutingModule {}
