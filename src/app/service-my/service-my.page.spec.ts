import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceMyPage } from './service-my.page';

describe('ServiceMyPage', () => {
  let component: ServiceMyPage;
  let fixture: ComponentFixture<ServiceMyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceMyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
