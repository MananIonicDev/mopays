import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAddProductPage } from './business-add-product.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessAddProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessAddProductPageRoutingModule {}
