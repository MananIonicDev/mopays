import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreImagesPage } from './explore-images.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreImagesPageRoutingModule {}
