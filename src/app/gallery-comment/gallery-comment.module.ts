import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GalleryCommentPageRoutingModule } from './gallery-comment-routing.module';
//import { GalleryCommentPage } from './gallery-comment.page';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SharePipesModule,
    GalleryCommentPageRoutingModule
  ],
  //declarations: [GalleryCommentPage]
})
export class GalleryCommentPageModule {}
