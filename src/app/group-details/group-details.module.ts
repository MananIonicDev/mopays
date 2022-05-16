import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupDetailsPageRoutingModule } from './group-details-routing.module';

import { GroupDetailsPage } from './group-details.page';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    SharePipesModule,
    FormsModule,
    IonicModule,
    GroupDetailsPageRoutingModule
  ],
  declarations: [GroupDetailsPage]
})
export class GroupDetailsPageModule {}
