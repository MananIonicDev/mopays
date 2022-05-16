import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupFeedEditPage } from './group-feed-edit.page';

describe('GroupFeedEditPage', () => {
  let component: GroupFeedEditPage;
  let fixture: ComponentFixture<GroupFeedEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFeedEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupFeedEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
