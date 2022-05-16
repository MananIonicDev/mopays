import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessAddProductPage } from './business-add-product.page';

describe('BusinessAddProductPage', () => {
  let component: BusinessAddProductPage;
  let fixture: ComponentFixture<BusinessAddProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessAddProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
