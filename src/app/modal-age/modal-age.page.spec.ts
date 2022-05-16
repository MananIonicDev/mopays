import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAgePage } from './modal-age.page';

describe('ModalAgePage', () => {
  let component: ModalAgePage;
  let fixture: ComponentFixture<ModalAgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
