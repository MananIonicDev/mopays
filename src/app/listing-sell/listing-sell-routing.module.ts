import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingSellPage } from './listing-sell.page';

const routes: Routes = [
  {
    path: '',
    component: ListingSellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingSellPageRoutingModule {}
