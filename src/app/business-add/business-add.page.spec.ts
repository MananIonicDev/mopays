import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessAddPage } from './business-add.page';

describe('BusinessAddPage', () => {
  let component: BusinessAddPage;
  let fixture: ComponentFixture<BusinessAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
