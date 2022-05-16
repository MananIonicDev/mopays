import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceImageAddPage } from './service-image-add.page';

describe('ServiceImageAddPage', () => {
  let component: ServiceImageAddPage;
  let fixture: ComponentFixture<ServiceImageAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceImageAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceImageAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
