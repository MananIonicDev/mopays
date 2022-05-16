import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopAppsPageRoutingModule } from './top-apps-routing.module';

import { TopAppsPage } from './top-apps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopAppsPageRoutingModule
  ],
  declarations: [TopAppsPage]
})
export class TopAppsPageModule {}
