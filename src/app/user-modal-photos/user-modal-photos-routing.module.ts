import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserModalPhotosPage } from './user-modal-photos.page';

const routes: Routes = [
  {
    path: '',
    component: UserModalPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModalPhotosPageRoutingModule {}
