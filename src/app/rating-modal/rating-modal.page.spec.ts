import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingModalPage } from './rating-modal.page';

describe('RatingModalPage', () => {
  let component: RatingModalPage;
  let fixture: ComponentFixture<RatingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
