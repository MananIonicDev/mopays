import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyGroupsPage } from './my-groups.page';

describe('MyGroupsPage', () => {
  let component: MyGroupsPage;
  let fixture: ComponentFixture<MyGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
