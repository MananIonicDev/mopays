import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessMyPage } from './business-my.page';

describe('BusinessMyPage', () => {
  let component: BusinessMyPage;
  let fixture: ComponentFixture<BusinessMyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessMyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessMyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
