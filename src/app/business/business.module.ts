import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusinessPageRoutingModule } from './business-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BusinessPage } from './business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    BusinessPageRoutingModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule {}
