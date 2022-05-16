import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsCategoryPageRoutingModule } from './jobs-category-routing.module';

import { JobsCategoryPage } from './jobs-category.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    JobsCategoryPageRoutingModule
  ],
  declarations: [JobsCategoryPage]
})
export class JobsCategoryPageModule {}
