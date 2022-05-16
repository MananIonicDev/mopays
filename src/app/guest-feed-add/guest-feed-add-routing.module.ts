import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestFeedAddPage } from './guest-feed-add.page';

const routes: Routes = [
  {
    path: '',
    component: GuestFeedAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestFeedAddPageRoutingModule {}
