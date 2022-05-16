import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsViewPageRoutingModule } from './jobs-view-routing.module';

import { JobsViewPage } from './jobs-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsViewPageRoutingModule
  ],
  declarations: [JobsViewPage]
})
export class JobsViewPageModule {}
