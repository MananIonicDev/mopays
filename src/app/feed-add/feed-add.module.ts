import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedAddPageRoutingModule } from './feed-add-routing.module';

import { FeedAddPage } from './feed-add.page';
import { PreviewImagePage } from '../preview-image/preview-image.page';
import { AddLocationPage } from '../add-location/add-location.page';
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
    FeedAddPageRoutingModule
  ],
  declarations: [FeedAddPage, PreviewImagePage, AddLocationPage],
  entryComponents: [PreviewImagePage, AddLocationPage]
})
export class FeedAddPageModule {}
