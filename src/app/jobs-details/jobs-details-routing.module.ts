import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsDetailsPage } from './jobs-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsDetailsPageRoutingModule {}
