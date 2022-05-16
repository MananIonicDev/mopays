import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsAddPage } from './jobs-add.page';

const routes: Routes = [
  {
    path: '',
    component: JobsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsAddPageRoutingModule {}
