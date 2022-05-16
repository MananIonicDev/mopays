import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyDashboardPage } from './my-dashboard.page';

describe('MyDashboardPage', () => {
  let component: MyDashboardPage;
  let fixture: ComponentFixture<MyDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
