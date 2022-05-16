import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBusinessPage } from './my-business.page';

describe('MyBusinessPage', () => {
  let component: MyBusinessPage;
  let fixture: ComponentFixture<MyBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
