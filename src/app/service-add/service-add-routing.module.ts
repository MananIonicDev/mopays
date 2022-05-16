import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceAddPage } from './service-add.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceAddPageRoutingModule {}
