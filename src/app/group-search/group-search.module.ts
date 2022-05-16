import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupSearchPageRoutingModule } from './group-search-routing.module';

import { GroupSearchPage } from './group-search.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    GroupSearchPageRoutingModule
  ],
  declarations: [GroupSearchPage]
})
export class GroupSearchPageModule {}
