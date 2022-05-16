import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedEditPageRoutingModule } from './feed-edit-routing.module';

import { FeedEditPage } from './feed-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedEditPageRoutingModule
  ],
  declarations: [FeedEditPage]
})
export class FeedEditPageModule {}
