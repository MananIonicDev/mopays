import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreModalPage } from './explore-modal.page';

describe('ExploreModalPage', () => {
  let component: ExploreModalPage;
  let fixture: ComponentFixture<ExploreModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
