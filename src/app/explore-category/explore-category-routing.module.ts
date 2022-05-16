import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreCategoryPage } from './explore-category.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreCategoryPageRoutingModule {}
