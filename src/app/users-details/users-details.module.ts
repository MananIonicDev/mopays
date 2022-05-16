import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersDetailsPageRoutingModule } from './users-details-routing.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { UsersDetailsPage } from './users-details.page';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { UserModalPage } from '../user-modal/user-modal.page';
import { UserModalPicturePage } from '../user-modal-picture/user-modal-picture.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuperTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    SharePipesModule,
    IonicModule,
    UsersDetailsPageRoutingModule
  ],
  declarations: [UsersDetailsPage, UserModalPage, UserModalPicturePage],
  entryComponents: [UserModalPage, UserModalPicturePage]
})
export class UsersDetailsPageModule {}
