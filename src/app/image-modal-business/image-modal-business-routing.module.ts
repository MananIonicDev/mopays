import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageModalBusinessPage } from './image-modal-business.page';

const routes: Routes = [
  {
    path: '',
    component: ImageModalBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageModalBusinessPageRoutingModule {}
