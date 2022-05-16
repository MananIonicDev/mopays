import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceEditPage } from './service-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceEditPageRoutingModule {}
