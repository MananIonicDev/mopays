import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceImageAddPage } from './service-image-add.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceImageAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceImageAddPageRoutingModule {}
