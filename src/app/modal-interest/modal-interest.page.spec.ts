import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInterestPage } from './modal-interest.page';

describe('ModalInterestPage', () => {
  let component: ModalInterestPage;
  let fixture: ComponentFixture<ModalInterestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInterestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInterestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
