import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingByCategoryPage } from './listing-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ListingByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingByCategoryPageRoutingModule {}
