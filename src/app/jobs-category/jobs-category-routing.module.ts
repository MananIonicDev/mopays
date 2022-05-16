import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsCategoryPage } from './jobs-category.page';

const routes: Routes = [
  {
    path: '',
    component: JobsCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsCategoryPageRoutingModule {}
