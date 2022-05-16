import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupCreatePage } from './group-create.page';

describe('GroupCreatePage', () => {
  let component: GroupCreatePage;
  let fixture: ComponentFixture<GroupCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
