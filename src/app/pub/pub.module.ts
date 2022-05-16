import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PubPageRoutingModule } from './pub-routing.module';
import { PubPage } from './pub.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { PubCategoryPage } from '../pub-category/pub-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    PubPageRoutingModule
  ],
  declarations: [PubPage, PubCategoryPage],
  entryComponents: [PubCategoryPage]
})
export class PubPageModule {}
