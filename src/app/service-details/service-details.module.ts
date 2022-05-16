import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';
import { ServiceDetailsPage } from './service-details.page';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { SharedModule } from 'src/shared/shared.module';
import { ImageModalPage } from '../image-modal/image-modal.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePipesModule,
    SharedModule,
    ServiceDetailsPageRoutingModule
  ],
  declarations: [ServiceDetailsPage, ImageModalPage],
  entryComponents: [ImageModalPage]
})
export class ServiceDetailsPageModule {}
