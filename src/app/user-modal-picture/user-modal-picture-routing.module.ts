import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserModalPicturePage } from './user-modal-picture.page';

const routes: Routes = [
  {
    path: '',
    component: UserModalPicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModalPicturePageRoutingModule {}
