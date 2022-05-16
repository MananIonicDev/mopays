import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreSubmitPageRoutingModule } from './explore-submit-routing.module';
import { ExploreSubmitPage } from './explore-submit.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ExploreSubmitPageRoutingModule
  ],
  declarations: [ExploreSubmitPage]
})
export class ExploreSubmitPageModule {}
