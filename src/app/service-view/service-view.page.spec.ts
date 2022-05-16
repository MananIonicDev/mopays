import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceViewPage } from './service-view.page';

describe('ServiceViewPage', () => {
  let component: ServiceViewPage;
  let fixture: ComponentFixture<ServiceViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
