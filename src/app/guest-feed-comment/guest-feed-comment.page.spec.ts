import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestFeedCommentPage } from './guest-feed-comment.page';

describe('GuestFeedCommentPage', () => {
  let component: GuestFeedCommentPage;
  let fixture: ComponentFixture<GuestFeedCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFeedCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestFeedCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
