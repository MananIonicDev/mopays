import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeatherSetPage } from './weather-set.page';

describe('WeatherSetPage', () => {
  let component: WeatherSetPage;
  let fixture: ComponentFixture<WeatherSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
