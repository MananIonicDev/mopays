import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceViewPage } from './service-view.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceViewPageRoutingModule {}
