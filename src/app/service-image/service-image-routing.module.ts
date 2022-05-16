import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceImagePage } from './service-image.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceImagePageRoutingModule {}
