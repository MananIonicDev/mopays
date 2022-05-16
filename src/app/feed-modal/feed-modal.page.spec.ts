import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedModalPage } from './feed-modal.page';

describe('FeedModalPage', () => {
  let component: FeedModalPage;
  let fixture: ComponentFixture<FeedModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
