import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesModalPage } from './features-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesModalPageRoutingModule {}
