import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreSubmitPage } from './explore-submit.page';

describe('ExploreSubmitPage', () => {
  let component: ExploreSubmitPage;
  let fixture: ComponentFixture<ExploreSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreSubmitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
