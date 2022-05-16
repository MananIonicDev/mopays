import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceMyPage } from './service-my.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceMyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceMyPageRoutingModule {}
