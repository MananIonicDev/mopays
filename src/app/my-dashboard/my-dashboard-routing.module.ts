import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDashboardPage } from './my-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MyDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDashboardPageRoutingModule {}
