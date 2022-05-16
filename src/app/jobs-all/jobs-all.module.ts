import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsAllPageRoutingModule } from './jobs-all-routing.module';

import { JobsAllPage } from './jobs-all.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    JobsAllPageRoutingModule
  ],
  declarations: [JobsAllPage]
})
export class JobsAllPageModule {}
