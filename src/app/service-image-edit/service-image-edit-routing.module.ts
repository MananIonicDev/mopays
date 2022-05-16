import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceImageEditPage } from './service-image-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceImageEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceImageEditPageRoutingModule {}
