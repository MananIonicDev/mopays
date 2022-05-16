import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherSetPageRoutingModule } from './weather-set-routing.module';

import { WeatherSetPage } from './weather-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherSetPageRoutingModule
  ],
  declarations: [WeatherSetPage]
})
export class WeatherSetPageModule {}
