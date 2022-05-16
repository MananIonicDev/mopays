import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupsMyPage } from './groups-my.page';

describe('GroupsMyPage', () => {
  let component: GroupsMyPage;
  let fixture: ComponentFixture<GroupsMyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsMyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsMyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
