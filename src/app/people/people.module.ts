import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PeoplePageRoutingModule } from './people-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PeoplePage } from './people.page';
import { ModalAgePage } from '../modal-age/modal-age.page';
import { ModalInterestPage } from '../modal-interest/modal-interest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    PeoplePageRoutingModule
  ],
  declarations: [PeoplePage, ModalAgePage, ModalInterestPage],
  entryComponents: [ModalAgePage, ModalInterestPage]
})
export class PeoplePageModule {}
