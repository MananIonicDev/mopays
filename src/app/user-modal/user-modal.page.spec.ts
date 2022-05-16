import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserModalPage } from './user-modal.page';

describe('UserModalPage', () => {
  let component: UserModalPage;
  let fixture: ComponentFixture<UserModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
