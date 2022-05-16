import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceEditPage } from './service-edit.page';

describe('ServiceEditPage', () => {
  let component: ServiceEditPage;
  let fixture: ComponentFixture<ServiceEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
