import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAgePage } from './modal-age.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAgePageRoutingModule {}
