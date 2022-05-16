import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceImagePage } from './service-image.page';

describe('ServiceImagePage', () => {
  let component: ServiceImagePage;
  let fixture: ComponentFixture<ServiceImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
