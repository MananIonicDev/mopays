import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobsDetailsPageRoutingModule } from './jobs-details-routing.module';
import { JobsDetailsPage } from './jobs-details.page';
import { AgmCoreModule } from '@agm/core';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    JobsDetailsPageRoutingModule
  ],
  declarations: [JobsDetailsPage]
})
export class JobsDetailsPageModule {}
