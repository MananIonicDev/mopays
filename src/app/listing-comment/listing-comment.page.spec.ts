import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingCommentPage } from './listing-comment.page';

describe('ListingCommentPage', () => {
  let component: ListingCommentPage;
  let fixture: ComponentFixture<ListingCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
