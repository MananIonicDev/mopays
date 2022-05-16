import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGroupPageRoutingModule } from './chat-group-routing.module';

import { ChatGroupPage } from './chat-group.page';
import { NgxEmojModule } from 'ngx-emoj';
import { SharePipesModule } from '../pipes/sharepipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEmojModule,
    SharePipesModule,
    ChatGroupPageRoutingModule
  ],
  declarations: [ChatGroupPage]
})
export class ChatGroupPageModule {}
