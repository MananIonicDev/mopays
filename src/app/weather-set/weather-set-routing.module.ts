import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherSetPage } from './weather-set.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherSetPageRoutingModule {}
