import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreCommentPage } from './explore-comment.page';

describe('ExploreCommentPage', () => {
  let component: ExploreCommentPage;
  let fixture: ComponentFixture<ExploreCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
