import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutoCompletePage } from 'src/app/auto-complete/auto-complete.page';
import { GallerySlidePage } from 'src/app/gallery-slide/gallery-slide.page';
import { GalleryListPage } from 'src/app/gallery-list/gallery-list.page';
import { GalleryCommentPage } from 'src/app/gallery-comment/gallery-comment.page';
import { ExploreImagesPage } from 'src/app/explore-images/explore-images.page';




@NgModule({
  declarations: [ 
     AutoCompletePage, GallerySlidePage, GalleryListPage, GalleryCommentPage, ExploreImagesPage],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
 /* entryComponents: [
    ParallaxHeader,
 ],*/
  exports : [
    FormsModule,
    ReactiveFormsModule,
 
    
  ],
  entryComponents: [AutoCompletePage, GallerySlidePage, GalleryListPage, GalleryCommentPage, ExploreImagesPage]
})
export class SharedModule { }