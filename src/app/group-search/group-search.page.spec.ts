import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupSearchPage } from './group-search.page';

describe('GroupSearchPage', () => {
  let component: GroupSearchPage;
  let fixture: ComponentFixture<GroupSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
