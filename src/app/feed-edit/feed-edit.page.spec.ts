import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedEditPage } from './feed-edit.page';

describe('FeedEditPage', () => {
  let component: FeedEditPage;
  let fixture: ComponentFixture<FeedEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
