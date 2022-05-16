import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsAllPage } from './groups-all.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsAllPageRoutingModule {}
