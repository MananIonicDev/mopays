import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyItemsPage } from './my-items.page';

describe('MyItemsPage', () => {
  let component: MyItemsPage;
  let fixture: ComponentFixture<MyItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
