import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeaturesModalPage } from './features-modal.page';

describe('FeaturesModalPage', () => {
  let component: FeaturesModalPage;
  let fixture: ComponentFixture<FeaturesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
