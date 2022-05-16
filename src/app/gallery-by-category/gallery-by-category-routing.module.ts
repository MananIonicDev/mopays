import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryByCategoryPage } from './gallery-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryByCategoryPageRoutingModule {}
