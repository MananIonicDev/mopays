import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GalleryListPageRoutingModule } from './gallery-list-routing.module';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    GalleryListPageRoutingModule
  ],
  //declarations: [GalleryListPage]
})
export class GalleryListPageModule {}
