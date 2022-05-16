import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessByCategoryPage } from './business-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessByCategoryPageRoutingModule {}
