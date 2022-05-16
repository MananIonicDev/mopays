import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreModalPage } from './explore-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreModalPageRoutingModule {}
