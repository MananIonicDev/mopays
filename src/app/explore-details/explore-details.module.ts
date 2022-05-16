import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreDetailsPageRoutingModule } from './explore-details-routing.module';
import { ExploreDetailsPage } from './explore-details.page';
import { SharedModule } from 'src/shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    SuperTabsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    IonicModule,
    ExploreDetailsPageRoutingModule
  ],
  declarations: [ExploreDetailsPage]
})
export class ExploreDetailsPageModule {}
