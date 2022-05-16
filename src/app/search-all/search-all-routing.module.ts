import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchAllPage } from './search-all.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAllPageRoutingModule {}
