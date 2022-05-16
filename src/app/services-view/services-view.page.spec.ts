import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesViewPage } from './services-view.page';

describe('ServicesViewPage', () => {
  let component: ServicesViewPage;
  let fixture: ComponentFixture<ServicesViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
