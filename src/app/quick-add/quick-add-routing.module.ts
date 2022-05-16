import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickAddPage } from './quick-add.page';

const routes: Routes = [
  {
    path: '',
    component: QuickAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickAddPageRoutingModule {}
