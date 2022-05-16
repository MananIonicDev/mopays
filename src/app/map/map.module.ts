import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MapDetailsPage } from '../map-details/map-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    MapPageRoutingModule
  ],
  declarations: [MapPage, MapDetailsPage],
  entryComponents: [MapDetailsPage]
})
export class MapPageModule {}
