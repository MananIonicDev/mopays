import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceAddPage } from './service-add.page';

describe('ServiceAddPage', () => {
  let component: ServiceAddPage;
  let fixture: ComponentFixture<ServiceAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
