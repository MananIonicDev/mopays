import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingSubcatPage } from './listing-subcat.page';

const routes: Routes = [
  {
    path: '',
    component: ListingSubcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingSubcatPageRoutingModule {}
