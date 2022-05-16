import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedCommentPage } from './feed-comment.page';

describe('FeedCommentPage', () => {
  let component: FeedCommentPage;
  let fixture: ComponentFixture<FeedCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
