import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EssentialsPage } from './essentials.page';

const routes: Routes = [
  {
    path: '',
    component: EssentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EssentialsPageRoutingModule {}
