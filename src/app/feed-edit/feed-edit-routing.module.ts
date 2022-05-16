import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedEditPage } from './feed-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FeedEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedEditPageRoutingModule {}
