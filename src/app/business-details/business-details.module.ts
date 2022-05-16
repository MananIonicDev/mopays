import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessDetailsPageRoutingModule } from './business-details-routing.module';
import { BusinessDetailsPage } from './business-details.page';
import { SharedModule } from 'src/shared/shared.module';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { AgmCoreModule } from '@agm/core';
import { ImageModalBusinessPage } from '../image-modal-business/image-modal-business.page';
import { ImagemodalbizproPage } from '../imagemodalbizpro/imagemodalbizpro.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SharePipesModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    IonicModule,
    BusinessDetailsPageRoutingModule
  ],
  declarations: [BusinessDetailsPage, ImageModalBusinessPage, ImagemodalbizproPage],
  entryComponents: [ImageModalBusinessPage, ImagemodalbizproPage]
})
export class BusinessDetailsPageModule {}
