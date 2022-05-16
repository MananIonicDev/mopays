import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserModalPicturePage } from './user-modal-picture.page';

describe('UserModalPicturePage', () => {
  let component: UserModalPicturePage;
  let fixture: ComponentFixture<UserModalPicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModalPicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserModalPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
