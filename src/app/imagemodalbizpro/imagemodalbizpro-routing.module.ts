import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagemodalbizproPage } from './imagemodalbizpro.page';

const routes: Routes = [
  {
    path: '',
    component: ImagemodalbizproPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagemodalbizproPageRoutingModule {}
