import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceViewPageRoutingModule } from './service-view-routing.module';

import { ServiceViewPage } from './service-view.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    ServiceViewPageRoutingModule
  ],
  declarations: [ServiceViewPage]
})
export class ServiceViewPageModule {}
