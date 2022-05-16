import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapDetailsPage } from './map-details.page';

const routes: Routes = [
  {
    path: '',
    component: MapDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapDetailsPageRoutingModule {}
