import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GallerySlidePage } from './gallery-slide.page';

const routes: Routes = [
  {
    path: '',
    component: GallerySlidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GallerySlidePageRoutingModule {}
