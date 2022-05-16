import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceImageEditPage } from './service-image-edit.page';

describe('ServiceImageEditPage', () => {
  let component: ServiceImageEditPage;
  let fixture: ComponentFixture<ServiceImageEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceImageEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceImageEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
