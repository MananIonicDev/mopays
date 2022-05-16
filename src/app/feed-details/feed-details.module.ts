import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedDetailsPageRoutingModule } from './feed-details-routing.module';

import { FeedDetailsPage } from './feed-details.page';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    IonicModule,
    FeedDetailsPageRoutingModule
  ],
  declarations: [FeedDetailsPage]
})
export class FeedDetailsPageModule {}
