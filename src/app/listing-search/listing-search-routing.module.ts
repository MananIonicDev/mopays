import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingSearchPage } from './listing-search.page';

const routes: Routes = [
  {
    path: '',
    component: ListingSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingSearchPageRoutingModule {}
