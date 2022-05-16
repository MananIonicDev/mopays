import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsMyPage } from './groups-my.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsMyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsMyPageRoutingModule {}
