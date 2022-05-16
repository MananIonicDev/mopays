import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingDetailsPageRoutingModule } from './listing-details-routing.module';
import { ListingDetailsPage } from './listing-details.page';
import { AgmCoreModule } from '@agm/core';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    IonicModule,
    ListingDetailsPageRoutingModule
  ],
  declarations: [ListingDetailsPage]
})
export class ListingDetailsPageModule {}
