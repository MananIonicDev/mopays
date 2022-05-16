import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyProfilePageRoutingModule } from './my-profile-routing.module';
import { MyProfilePage } from './my-profile.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SharePipesModule } from '../pipes/sharepipe.module';
import { ProfileModalPage } from '../profile-modal/profile-modal.page';
import { UserModalPhotosPage } from '../user-modal-photos/user-modal-photos.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw'
    }),
    SharePipesModule,
    SuperTabsModule,
    MyProfilePageRoutingModule
  ],
  declarations: [MyProfilePage, ProfileModalPage, UserModalPhotosPage],
  entryComponents: [ProfileModalPage, UserModalPhotosPage]
})
export class MyProfilePageModule {}
