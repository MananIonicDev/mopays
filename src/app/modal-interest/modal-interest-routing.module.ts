import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInterestPage } from './modal-interest.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInterestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInterestPageRoutingModule {}
