import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedModalPage } from './feed-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FeedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedModalPageRoutingModule {}
