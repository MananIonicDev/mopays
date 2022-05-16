import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessMyPage } from './business-my.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessMyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessMyPageRoutingModule {}
