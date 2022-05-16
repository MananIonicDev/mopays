import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceEditPageRoutingModule } from './service-edit-routing.module';

import { ServiceEditPage } from './service-edit.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ServiceEditPageRoutingModule
  ],
  declarations: [ServiceEditPage]
})
export class ServiceEditPageModule {}
