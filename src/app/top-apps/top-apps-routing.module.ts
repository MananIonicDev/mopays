import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopAppsPage } from './top-apps.page';

const routes: Routes = [
  {
    path: '',
    component: TopAppsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopAppsPageRoutingModule {}
