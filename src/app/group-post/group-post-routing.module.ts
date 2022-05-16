import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPostPage } from './group-post.page';

const routes: Routes = [
  {
    path: '',
    component: GroupPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPostPageRoutingModule {}
