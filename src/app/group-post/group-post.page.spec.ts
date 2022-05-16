import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupPostPage } from './group-post.page';

describe('GroupPostPage', () => {
  let component: GroupPostPage;
  let fixture: ComponentFixture<GroupPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
