import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupCommentPage } from './group-comment.page';

describe('GroupCommentPage', () => {
  let component: GroupCommentPage;
  let fixture: ComponentFixture<GroupCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
