import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSearchPage } from './group-search.page';

const routes: Routes = [
  {
    path: '',
    component: GroupSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSearchPageRoutingModule {}
