import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupsAllPage } from './groups-all.page';

describe('GroupsAllPage', () => {
  let component: GroupsAllPage;
  let fixture: ComponentFixture<GroupsAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
