import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreSubmitPage } from './explore-submit.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreSubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreSubmitPageRoutingModule {}
