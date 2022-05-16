import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsAddPageRoutingModule } from './jobs-add-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { JobsAddPage } from './jobs-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    JobsAddPageRoutingModule
  ],
  declarations: [JobsAddPage]
})
export class JobsAddPageModule {}
