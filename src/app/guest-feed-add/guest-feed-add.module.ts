import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestFeedAddPageRoutingModule } from './guest-feed-add-routing.module';

import { GuestFeedAddPage } from './guest-feed-add.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    ReactiveFormsModule,
    IonicModule,
    GuestFeedAddPageRoutingModule
  ],
  declarations: [GuestFeedAddPage],
  entryComponents: []
})
export class GuestFeedAddPageModule {}
