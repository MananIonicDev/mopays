import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesModalPage } from './categories-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesModalPageRoutingModule {}
