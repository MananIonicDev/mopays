import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServiceCommentPageRoutingModule } from './service-comment-routing.module';
import { ServiceCommentPage } from './service-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    ServiceCommentPageRoutingModule
  ],
  declarations: [ServiceCommentPage]
})
export class ServiceCommentPageModule {}
