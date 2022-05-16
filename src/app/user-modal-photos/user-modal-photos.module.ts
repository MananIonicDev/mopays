import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModalPhotosPageRoutingModule } from './user-modal-photos-routing.module';
import { SharePipesModule } from '../pipes/sharepipe.module';

//import { UserModalPhotosPage } from './user-modal-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharePipesModule,
    IonicModule,
    UserModalPhotosPageRoutingModule
  ],
  //declarations: [UserModalPhotosPage]
})
export class UserModalPhotosPageModule {}
